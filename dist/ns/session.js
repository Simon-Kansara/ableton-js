"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Session = void 0;
const _1 = require(".");
class Session extends _1.Namespace {
    constructor(ableton) {
        super(ableton, "session", undefined);
    }
    async setupSessionBox(num_tracks, num_scenes) {
        return this.sendCommand("setup_session_box", { num_tracks, num_scenes });
    }
    async setSessionOffset(track_offset, scene_offset) {
        return this.sendCommand("set_session_offset", {
            track_offset,
            scene_offset,
        });
    }
}
exports.Session = Session;
