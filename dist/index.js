"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPackageVersion = exports.Ableton = exports.DisconnectError = exports.TimeoutError = void 0;
const os_1 = __importDefault(require("os"));
const path_1 = __importDefault(require("path"));
const dgram_1 = __importDefault(require("dgram"));
const lodash_1 = require("lodash");
const events_1 = require("events");
const uuid_1 = require("uuid");
const semver_1 = __importDefault(require("semver"));
const zlib_1 = require("zlib");
const lru_cache_1 = __importDefault(require("lru-cache"));
const fs_1 = require("fs");
const promises_1 = require("fs/promises");
const song_1 = require("./ns/song");
const internal_1 = require("./ns/internal");
const application_1 = require("./ns/application");
const midi_1 = require("./ns/midi");
const package_version_1 = require("./util/package-version");
const cache_1 = require("./util/cache");
const session_1 = require("./ns/session");
const SERVER_PORT_FILE = "ableton-js-server.port";
const CLIENT_PORT_FILE = "ableton-js-client.port";
class TimeoutError extends Error {
    message;
    payload;
    constructor(message, payload) {
        super(message);
        this.message = message;
        this.payload = payload;
    }
}
exports.TimeoutError = TimeoutError;
class DisconnectError extends Error {
    message;
    payload;
    constructor(message, payload) {
        super(message);
        this.message = message;
        this.payload = payload;
    }
}
exports.DisconnectError = DisconnectError;
class Ableton extends events_1.EventEmitter {
    options;
    client;
    msgMap = new Map();
    eventListeners = new Map();
    heartbeatInterval;
    _isConnected = false;
    buffer = [];
    latency = 0;
    serverPort;
    cache;
    song = new song_1.Song(this);
    session = new session_1.Session(this); // added for red session ring control
    application = new application_1.Application(this);
    internal = new internal_1.Internal(this);
    midi = new midi_1.Midi(this);
    clientPortFile;
    serverPortFile;
    logger;
    clientState = "closed";
    cancelDisconnectEvents = [];
    constructor(options) {
        super();
        this.options = options;
        this.logger = options?.logger;
        if (!options?.disableCache) {
            this.cache = new lru_cache_1.default({
                max: 500,
                ttl: 1000 * 60 * 10,
                ...options?.cacheOptions,
            });
        }
        this.clientPortFile = path_1.default.join(os_1.default.tmpdir(), this.options?.clientPortFile ?? CLIENT_PORT_FILE);
        this.serverPortFile = path_1.default.join(os_1.default.tmpdir(), this.options?.serverPortFile ?? SERVER_PORT_FILE);
    }
    handleConnect(type) {
        if (!this._isConnected) {
            this._isConnected = true;
            this.logger?.info("Live connected", { type });
            this.emit("connect", type);
        }
    }
    handleDisconnect(type) {
        if (this._isConnected) {
            this._isConnected = false;
            this.eventListeners.clear();
            // If the disconnect is caused by missed heartbeats, keep
            // pending requests. Live might just be temporarily hanging.
            if (type === "realtime") {
                this.msgMap.forEach((msg) => msg.clearTimeout());
                this.msgMap.clear();
            }
            this.logger?.info("Live disconnected", { type });
            this.emit("disconnect", type);
        }
    }
    /**
     * If connected, returns immediately. Otherwise,
     * it waits for a connection event before returning.
     */
    async waitForConnection() {
        if (this._isConnected) {
            return;
        }
        else {
            return Promise.race([
                new Promise((res) => this.once("connect", res)),
                this.internal.get("ping").catch(() => new Promise(() => { })),
            ]);
        }
    }
    /**
     * Starts the server and waits for a connection with Live to be established.
     *
     * @param timeoutMs
     * If set, the function will throw an error if it can't establish a connection
     * in the given time. Should be higher than 2000ms to avoid false positives.
     */
    async start(timeoutMs) {
        if (this.clientState !== "closed") {
            this.logger?.warn("Tried calling start, but client is already " + this.clientState);
            return this.waitForConnection();
        }
        this.clientState = "starting";
        // The recvBufferSize is set to macOS' default value, so the
        // socket behaves the same on Windows and doesn't drop any packets
        this.client = dgram_1.default.createSocket({ type: "udp4", recvBufferSize: 786896 });
        this.client.addListener("message", this.handleIncoming.bind(this));
        this.client.addListener("listening", async () => {
            const port = this.client?.address().port;
            this.logger?.info("Client is bound and listening", { port });
            // Write used port to a file so Live can read from it on startup
            await (0, promises_1.writeFile)(this.clientPortFile, String(port));
        });
        this.client.bind(undefined, "127.0.0.1");
        // Wait for the server port file to exist
        const sentPort = await new Promise(async (res) => {
            try {
                const serverPort = await (0, promises_1.readFile)(this.serverPortFile);
                this.serverPort = Number(serverPort.toString());
                this.logger?.info("Server port:", { port: this.serverPort });
                res(false);
            }
            catch (e) {
                this.logger?.info("Server doesn't seem to be online yet, waiting for it to go online...");
            }
            // Set up a watcher in case the server port changes
            (0, fs_1.watchFile)(this.serverPortFile, async (curr) => {
                if (curr.isFile()) {
                    const serverPort = await (0, promises_1.readFile)(this.serverPortFile);
                    const newPort = Number(serverPort.toString());
                    if (!isNaN(newPort) && newPort !== this.serverPort) {
                        this.logger?.info("Server port changed:", { port: newPort });
                        this.serverPort = Number(serverPort.toString());
                        if (this.client) {
                            try {
                                const port = this.client.address().port;
                                this.logger?.info("Sending port to Live:", { port });
                                await this.setProp("internal", "", "client_port", port);
                                res(true);
                                return;
                            }
                            catch (e) {
                                this.logger?.info("Sending port to Live failed", { e });
                            }
                        }
                    }
                    res(false);
                }
            });
        });
        // Send used port to Live in case the plugin is already started
        if (!sentPort) {
            try {
                const port = this.client.address().port;
                this.logger?.info("Sending port to Live:", { port });
                await this.setProp("internal", "", "client_port", port);
            }
            catch (e) {
                this.logger?.info("Live doesn't seem to be loaded yet, waiting...");
            }
        }
        this.logger?.info("Checking connection...");
        const connection = this.waitForConnection();
        if (timeoutMs) {
            const timeout = new Promise((_, rej) => setTimeout(() => rej("Connection timed out."), timeoutMs));
            await Promise.race([connection, timeout]);
        }
        else {
            await connection;
        }
        this.logger?.info("Got connection!");
        this.clientState = "started";
        this.handleConnect("start");
        const heartbeat = async () => {
            // Add a cancel function to the array of heartbeats
            let canceled = false;
            const cancel = () => {
                canceled = true;
                this.logger?.debug("Cancelled heartbeat");
            };
            this.cancelDisconnectEvents.push(cancel);
            try {
                await this.internal.get("ping");
                this.handleConnect("heartbeat");
            }
            catch (e) {
                // If the heartbeat has been canceled, don't emit a disconnect event
                if (!canceled && this._isConnected) {
                    this.logger?.warn("Heartbeat failed:", { error: e, canceled });
                    this.handleDisconnect("heartbeat");
                }
            }
            finally {
                this.cancelDisconnectEvents = this.cancelDisconnectEvents.filter((e) => e !== cancel);
            }
        };
        this.heartbeatInterval = setInterval(heartbeat, this.options?.heartbeatInterval ?? 2000);
        heartbeat();
        this.internal
            .get("version")
            .then((v) => {
            const jsVersion = (0, package_version_1.getPackageVersion)();
            if (semver_1.default.lt(v, jsVersion)) {
                this.logger?.warn(`The installed version of your AbletonJS plugin (${v}) is lower than the JS library (${jsVersion}).`, "Please update your AbletonJS plugin to the latest version: https://git.io/JvaOu");
            }
        })
            .catch(() => { });
    }
    /** Closes the client */
    async close() {
        this.logger?.info("Closing the client");
        (0, fs_1.unwatchFile)(this.serverPortFile);
        if (this.heartbeatInterval) {
            clearInterval(this.heartbeatInterval);
        }
        if (this.client) {
            const closePromise = new Promise((res) => this.client?.once("close", res));
            this.client.close();
            await closePromise;
        }
        this.clientState = "closed";
        this._isConnected = false;
        this.logger?.info("Client closed");
    }
    /**
     * Returns the latency between the last command and its response.
     * This is a rough measurement, so don't rely too much on it.
     */
    getPing() {
        return this.latency;
    }
    setPing(latency) {
        this.latency = latency;
        this.emit("ping", this.latency);
    }
    handleIncoming(msg, info) {
        try {
            const messageId = msg[0];
            const messageIndex = msg[1];
            const totalMessages = msg[2];
            const message = msg.subarray(3);
            if (messageIndex === 0 && totalMessages === 1) {
                this.handleUncompressedMessage((0, zlib_1.unzipSync)(message).toString());
                return;
            }
            if (!this.buffer[messageId]) {
                this.buffer[messageId] = [];
            }
            this.buffer[messageId][messageIndex] = message;
            if (!this.buffer[messageId].includes(undefined) &&
                this.buffer[messageId].length === totalMessages) {
                this.handleUncompressedMessage((0, zlib_1.unzipSync)(Buffer.concat(this.buffer[messageId])).toString());
                delete this.buffer[messageId];
            }
        }
        catch (e) {
            this.buffer = [];
            this.emit("error", e);
        }
    }
    handleUncompressedMessage(msg) {
        this.emit("raw_message", msg);
        const data = JSON.parse(msg);
        const functionCallback = this.msgMap.get(data.uuid);
        this.emit("message", data);
        if (data.event === "result" && functionCallback) {
            this.msgMap.delete(data.uuid);
            return functionCallback.res(data.data);
        }
        if (data.event === "error" && functionCallback) {
            this.msgMap.delete(data.uuid);
            return functionCallback.rej(new Error(data.data));
        }
        if (data.event === "disconnect") {
            return this.handleDisconnect("realtime");
        }
        if (data.event === "connect") {
            // If some heartbeat ping from the old connection is still pending,
            // cancel it to prevent a double disconnect/connect event.
            this.cancelDisconnectEvents.forEach((cancel) => cancel());
            if (data.data?.port && data.data?.port !== this.serverPort) {
                this.logger?.info("Got new server port via connect:", {
                    port: data.data.port,
                });
                this.serverPort = data.data.port;
            }
            return this.handleConnect(this.clientState === "starting" ? "start" : "realtime");
        }
        const eventCallback = this.eventListeners.get(data.event);
        if (eventCallback) {
            return eventCallback.forEach((cb) => cb(data.data));
        }
        if (data.uuid) {
            this.logger?.warn("Message could not be assigned to any request:", {
                msg,
            });
        }
    }
    /**
     * Sends a raw command to Ableton. Usually, you won't need this.
     * A good starting point in general is the `song` prop.
     */
    async sendCommand(command) {
        return new Promise((res, rej) => {
            const msgId = (0, uuid_1.v4)();
            const payload = {
                uuid: msgId,
                ...command,
            };
            const msg = JSON.stringify(payload);
            const timeout = this.options?.commandTimeoutMs ?? 2000;
            const arg = (0, lodash_1.truncate)(JSON.stringify(command.args), { length: 100 });
            const cls = command.nsid ? `${command.ns}(${command.nsid})` : command.ns;
            const timeoutId = setTimeout(() => {
                rej(new TimeoutError(`The command ${cls}.${command.name}(${arg}) timed out after ${timeout} ms.`, payload));
            }, timeout);
            const currentTimestamp = Date.now();
            this.msgMap.set(msgId, {
                res: (result) => {
                    const duration = Date.now() - currentTimestamp;
                    if (duration > (this.options?.commandWarnMs ?? 1000)) {
                        this.logger?.warn(`Command took longer than expected`, {
                            command,
                            duration,
                        });
                    }
                    this.setPing(duration);
                    clearTimeout(timeoutId);
                    res(result);
                },
                rej,
                clearTimeout: () => {
                    clearTimeout(timeoutId);
                    rej(new DisconnectError(`Live disconnected before being able to respond to ${cls}.${command.name}(${arg})`, payload));
                },
            });
            this.sendRaw(msg);
        });
    }
    async sendCachedCommand(command) {
        const args = command.args?.prop ?? JSON.stringify(command.args);
        const cacheKey = [command.ns, command.nsid, args].filter(Boolean).join("/");
        const cached = this.cache?.get(cacheKey);
        const result = await this.sendCommand({
            ...command,
            etag: cached?.etag,
            cache: true,
        });
        if ((0, cache_1.isCached)(result)) {
            if (!cached) {
                throw new Error("Tried to get an object that isn't cached.");
            }
            else {
                return cached.data;
            }
        }
        else {
            if (result.etag) {
                this.cache?.set(cacheKey, result);
            }
            return result.data;
        }
    }
    async getProp(ns, nsid, prop, cache) {
        const params = { ns, nsid, name: "get_prop", args: { prop } };
        if (cache && this.cache) {
            return this.sendCachedCommand(params);
        }
        else {
            return this.sendCommand(params);
        }
    }
    async setProp(ns, nsid, prop, value) {
        return this.sendCommand({
            ns,
            nsid,
            name: "set_prop",
            args: { prop, value },
        });
    }
    async addPropListener(ns, nsid, prop, listener) {
        const eventId = (0, uuid_1.v4)();
        const result = await this.sendCommand({
            ns,
            nsid,
            name: "add_listener",
            args: { prop, nsid, eventId },
        });
        if (!this.eventListeners.has(result)) {
            this.eventListeners.set(result, [listener]);
        }
        else {
            this.eventListeners.set(result, [
                ...this.eventListeners.get(result),
                listener,
            ]);
        }
        return () => this.removePropListener(ns, nsid, prop, result, listener);
    }
    async removePropListener(ns, nsid, prop, eventId, listener) {
        const listeners = this.eventListeners.get(eventId);
        if (!listeners) {
            return false;
        }
        if (listeners.length > 1) {
            this.eventListeners.set(eventId, listeners.filter((l) => l !== listener));
            return true;
        }
        if (listeners.length === 1) {
            this.eventListeners.delete(eventId);
            await this.sendCommand({
                ns,
                nsid,
                name: "remove_listener",
                args: { prop, nsid },
            });
            return true;
        }
    }
    /**
     * Removes all event listeners that were attached to properties.
     * This is useful for clearing all listeners when Live
     * disconnects, for example.
     */
    removeAllPropListeners() {
        this.eventListeners.clear();
    }
    async sendRaw(msg) {
        if (!this.client || !this.serverPort) {
            throw new Error("The client hasn't been started yet. Please call start() first.");
        }
        const buffer = (0, zlib_1.deflateSync)(Buffer.from(msg));
        const byteLimit = this.client.getSendBufferSize() - 100;
        const chunks = Math.ceil(buffer.byteLength / byteLimit);
        // Split the message into chunks if it becomes too large
        for (let i = 0; i < chunks; i++) {
            const chunk = Buffer.concat([
                // Add a counter to the message, the last message is always 255
                Buffer.alloc(1, i + 1 === chunks ? 255 : i),
                buffer.subarray(i * byteLimit, i * byteLimit + byteLimit),
            ]);
            this.client.send(chunk, 0, chunk.length, this.serverPort, "127.0.0.1");
            // Add a bit of a delay between sent chunks to reduce the chance of the
            // receiving buffer filling up which would cause chunks to be discarded.
            await new Promise((res) => setTimeout(res, 20));
        }
    }
    isConnected() {
        return this._isConnected;
    }
}
exports.Ableton = Ableton;
var package_version_2 = require("./util/package-version");
Object.defineProperty(exports, "getPackageVersion", { enumerable: true, get: function () { return package_version_2.getPackageVersion; } });
