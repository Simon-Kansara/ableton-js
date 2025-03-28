"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MixerDevice = exports.CrossfadeAssignment = exports.PanningMode = void 0;
const _1 = require(".");
const device_parameter_1 = require("./device-parameter");
var PanningMode;
(function (PanningMode) {
    PanningMode[PanningMode["Stereo"] = 0] = "Stereo";
    PanningMode[PanningMode["StereoSplit"] = 1] = "StereoSplit";
})(PanningMode || (exports.PanningMode = PanningMode = {}));
var CrossfadeAssignment;
(function (CrossfadeAssignment) {
    CrossfadeAssignment[CrossfadeAssignment["A"] = 0] = "A";
    CrossfadeAssignment[CrossfadeAssignment["None"] = 1] = "None";
    CrossfadeAssignment[CrossfadeAssignment["B"] = 2] = "B";
})(CrossfadeAssignment || (exports.CrossfadeAssignment = CrossfadeAssignment = {}));
class MixerDevice extends _1.Namespace {
    raw;
    constructor(ableton, raw) {
        super(ableton, "mixer-device", raw.id);
        this.raw = raw;
        this.transformers = {
            crossfader: (v) => new device_parameter_1.DeviceParameter(ableton, v),
            cue_volume: (v) => new device_parameter_1.DeviceParameter(ableton, v),
            left_split_stereo: (v) => new device_parameter_1.DeviceParameter(ableton, v),
            panning: (v) => new device_parameter_1.DeviceParameter(ableton, v),
            right_split_stereo: (v) => new device_parameter_1.DeviceParameter(ableton, v),
            sends: (v) => v.map((s) => new device_parameter_1.DeviceParameter(ableton, s)),
            song_tempo: (v) => new device_parameter_1.DeviceParameter(ableton, v),
            track_activator: (v) => new device_parameter_1.DeviceParameter(ableton, v),
            volume: (v) => new device_parameter_1.DeviceParameter(ableton, v),
        };
    }
}
exports.MixerDevice = MixerDevice;
