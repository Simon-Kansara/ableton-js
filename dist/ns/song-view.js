"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SongView = void 0;
const _1 = require(".");
const clip_1 = require("./clip");
const clip_slot_1 = require("./clip-slot");
const device_parameter_1 = require("./device-parameter");
const scene_1 = require("./scene");
const track_1 = require("./track");
class SongView extends _1.Namespace {
    constructor(ableton) {
        super(ableton, "song-view");
        this.transformers = {
            selected_parameter: (param) => new device_parameter_1.DeviceParameter(ableton, param),
            selected_track: (track) => new track_1.Track(ableton, track),
            selected_scene: (scene) => new scene_1.Scene(ableton, scene),
            highlighted_clip_slot: (slot) => new clip_slot_1.ClipSlot(ableton, slot),
            detail_clip: (clip) => new clip_1.Clip(ableton, clip),
        };
        this.cachedProps = {
            detail_clip: true,
            selected_parameter: true,
            selected_track: true,
            selected_scene: true,
            highlighted_clip_slot: true,
        };
    }
    async selectDevice(device) {
        return this.ableton.sendCommand({
            ns: this.ns,
            name: "select_device",
            args: { device_id: device.raw.id },
        });
    }
}
exports.SongView = SongView;
