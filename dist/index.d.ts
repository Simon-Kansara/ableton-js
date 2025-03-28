import { EventEmitter } from "events";
import LruCache from "lru-cache";
import { Song } from "./ns/song";
import { Internal } from "./ns/internal";
import { Application } from "./ns/application";
import { Midi } from "./ns/midi";
import { Cache } from "./util/cache";
import { Logger } from "./util/logger";
import { Session } from "./ns/session";
interface Command {
    uuid: string;
    ns: string;
    nsid?: string;
    name: string;
    etag?: string;
    cache?: boolean;
    args?: {
        [k: string]: any;
    };
}
type DisconnectEventType = "realtime" | "heartbeat";
type ConnectEventType = DisconnectEventType | "start";
interface ConnectionEventEmitter {
    on(e: "connect", l: (t: ConnectEventType) => void): this;
    on(e: "disconnect", l: (t: DisconnectEventType) => void): this;
    on(e: "message", l: (t: any) => void): this;
    on(e: "error", l: (t: Error) => void): this;
    on(e: "ping", l: (t: number) => void): this;
}
export interface EventListener {
    prop: string;
    eventId: string;
    listener: (data: any) => any;
}
export declare class TimeoutError extends Error {
    message: string;
    payload: Command;
    constructor(message: string, payload: Command);
}
export declare class DisconnectError extends Error {
    message: string;
    payload: Command;
    constructor(message: string, payload: Command);
}
export interface AbletonOptions {
    /**
     * Name of the file containing the port of the Remote Script. This
     * file is expected to be in the OS' tmp directory.
     *
     * @default ableton-js-server.port
     */
    serverPortFile?: string;
    /**
     * Name of the file containing the port of the client. This file
     * is created in the OS' tmp directory if it doesn't exist yet.
     *
     * @default ableton-js-client.port
     */
    clientPortFile?: string;
    /**
     * Defines how regularly ableton-js should ping the Remote Script
     * to check if it's still reachable, in milliseconds.
     *
     * @default 2000
     */
    heartbeatInterval?: number;
    /**
     * Defines how long ableton-js waits for an answer from the Remote
     * Script after sending a command before throwing a timeout error.
     *
     * @default 2000
     */
    commandTimeoutMs?: number;
    /**
     * Defines how long ableton-js waits for an answer from the Remote
     * Script after sending a command logging a warning about the delay.
     *
     * @default 1000
     */
    commandWarnMs?: number;
    /**
     * Options for the response cache.
     */
    cacheOptions?: LruCache.Options<string, any>;
    /**
     * Completely disables the cache.
     */
    disableCache?: boolean;
    /**
     * Set this to allow ableton-js to log messages. If you set this to
     * `console`, log messages are printed to the standard output.
     */
    logger?: Logger;
}
export declare class Ableton extends EventEmitter implements ConnectionEventEmitter {
    private options?;
    private client;
    private msgMap;
    private eventListeners;
    private heartbeatInterval;
    private _isConnected;
    private buffer;
    private latency;
    private serverPort;
    cache?: Cache;
    song: Song;
    session: Session;
    application: Application;
    internal: Internal;
    midi: Midi;
    private clientPortFile;
    private serverPortFile;
    private logger;
    private clientState;
    private cancelDisconnectEvents;
    constructor(options?: AbletonOptions | undefined);
    private handleConnect;
    private handleDisconnect;
    /**
     * If connected, returns immediately. Otherwise,
     * it waits for a connection event before returning.
     */
    waitForConnection(): Promise<unknown>;
    /**
     * Starts the server and waits for a connection with Live to be established.
     *
     * @param timeoutMs
     * If set, the function will throw an error if it can't establish a connection
     * in the given time. Should be higher than 2000ms to avoid false positives.
     */
    start(timeoutMs?: number): Promise<unknown>;
    /** Closes the client */
    close(): Promise<void>;
    /**
     * Returns the latency between the last command and its response.
     * This is a rough measurement, so don't rely too much on it.
     */
    getPing(): number;
    private setPing;
    private handleIncoming;
    private handleUncompressedMessage;
    /**
     * Sends a raw command to Ableton. Usually, you won't need this.
     * A good starting point in general is the `song` prop.
     */
    sendCommand(command: Omit<Command, "uuid">): Promise<any>;
    sendCachedCommand(command: Omit<Command, "uuid" | "cache">): Promise<any>;
    getProp(ns: string, nsid: string | undefined, prop: string, cache?: boolean): Promise<any>;
    setProp(ns: string, nsid: string | undefined, prop: string, value: any): Promise<any>;
    addPropListener(ns: string, nsid: string | undefined, prop: string, listener: (data: any) => any): Promise<() => Promise<boolean | undefined>>;
    removePropListener(ns: string, nsid: string | undefined, prop: string, eventId: string, listener: (data: any) => any): Promise<boolean | undefined>;
    /**
     * Removes all event listeners that were attached to properties.
     * This is useful for clearing all listeners when Live
     * disconnects, for example.
     */
    removeAllPropListeners(): void;
    sendRaw(msg: string): Promise<void>;
    isConnected(): boolean;
}
export { getPackageVersion } from "./util/package-version";
