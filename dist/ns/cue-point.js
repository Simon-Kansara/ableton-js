"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CuePoint = void 0;
const _1 = require(".");
class CuePoint extends _1.Namespace {
    raw;
    constructor(ableton, raw) {
        super(ableton, "cue-point", raw.id);
        this.raw = raw;
    }
    async jump() {
        return this.sendCommand("jump");
    }
}
exports.CuePoint = CuePoint;
