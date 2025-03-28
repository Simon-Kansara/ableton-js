"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Track = exports.RoutingCategory = exports.RoutingLayout = void 0;
const _1 = require(".");
const device_1 = require("./device");
const clip_slot_1 = require("./clip-slot");
const mixer_device_1 = require("./mixer-device");
const clip_1 = require("./clip");
const color_1 = require("../util/color");
const track_view_1 = require("./track-view");
var RoutingLayout;
(function (RoutingLayout) {
    RoutingLayout[RoutingLayout["Mono"] = 1] = "Mono";
    RoutingLayout[RoutingLayout["Stereo"] = 2] = "Stereo";
})(RoutingLayout || (exports.RoutingLayout = RoutingLayout = {}));
var RoutingCategory;
(function (RoutingCategory) {
    RoutingCategory[RoutingCategory["External"] = 0] = "External";
    RoutingCategory[RoutingCategory["Rewire"] = 1] = "Rewire";
    RoutingCategory[RoutingCategory["Resampling"] = 2] = "Resampling";
    RoutingCategory[RoutingCategory["Master"] = 3] = "Master";
    RoutingCategory[RoutingCategory["Track"] = 4] = "Track";
    RoutingCategory[RoutingCategory["ParentGroupTrack"] = 5] = "ParentGroupTrack";
    RoutingCategory[RoutingCategory["None"] = 6] = "None";
    RoutingCategory[RoutingCategory["Invalid"] = 7] = "Invalid";
})(RoutingCategory || (exports.RoutingCategory = RoutingCategory = {}));
class Track extends _1.Namespace {
    raw;
    view;
    constructor(ableton, raw) {
        super(ableton, "track", raw.id);
        this.raw = raw;
        this.view = new track_view_1.TrackView(this.ableton, raw.id);
        this.transformers = {
            arrangement_clips: (clips) => clips.map((clip) => new clip_1.Clip(ableton, clip)),
            color: (c) => new color_1.Color(c),
            devices: (devices) => devices.map((d) => new device_1.Device(ableton, d)),
            clip_slots: (clip_slots) => clip_slots.map((c) => new clip_slot_1.ClipSlot(ableton, c)),
            mixer_device: (mixer_device) => new mixer_device_1.MixerDevice(ableton, mixer_device),
        };
        this.cachedProps = {
            arrangement_clips: true,
            devices: true,
            clip_slots: true,
        };
    }
    /**
     * Duplicates the given clip into the arrangement of this track at the provided destination time and returns it.
     * When the type of the clip and the type of the track are incompatible, a runtime error is raised.
     */
    duplicateClipToArrangement(clipOrId, time) {
        return this.sendCommand("duplicate_clip_to_arrangement", {
            clip_id: typeof clipOrId === "string" ? clipOrId : clipOrId.raw.id,
            time: time,
        });
    }
}
exports.Track = Track;
