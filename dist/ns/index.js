"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Namespace = void 0;
class Namespace {
    ableton;
    ns;
    nsid;
    transformers = {};
    cachedProps = {};
    constructor(ableton, ns, nsid) {
        this.ableton = ableton;
        this.ns = ns;
        this.nsid = nsid;
    }
    async get(prop, useCache) {
        const cache = useCache ?? !!this.cachedProps[prop];
        const res = await this.ableton.getProp(this.ns, this.nsid, String(prop), cache);
        const transformer = this.transformers[prop];
        if (res !== null && transformer) {
            return transformer(res);
        }
        else {
            return res;
        }
    }
    async set(prop, value) {
        return this.ableton.setProp(this.ns, this.nsid, String(prop), value);
    }
    async addListener(prop, listener) {
        const transformer = this.transformers[prop];
        return this.ableton.addPropListener(this.ns, this.nsid, String(prop), (data) => {
            if (data !== null && transformer) {
                listener(transformer(data));
            }
            else {
                listener(data);
            }
        });
    }
    /**
     * Sends a raw function invocation to Ableton.
     * This should be used with caution.
     */
    async sendCommand(name, args, etag) {
        return this.ableton.sendCommand({
            ns: this.ns,
            nsid: this.nsid,
            name,
            args,
            etag,
        });
    }
    /**
     * Sends a raw function invocation to Ableton and expects the
     * result to be a CacheResponse with `data` and an `etag`.
     */
    async sendCachedCommand(name, args) {
        return this.ableton.sendCachedCommand({
            ns: this.ns,
            nsid: this.nsid,
            name,
            args,
        });
    }
}
exports.Namespace = Namespace;
