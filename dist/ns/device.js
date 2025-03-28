"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Device = exports.DeviceType = void 0;
const _1 = require(".");
const device_parameter_1 = require("./device-parameter");
var DeviceType;
(function (DeviceType) {
    DeviceType["AudioEffect"] = "audio_effect";
    DeviceType["Instrument"] = "instrument";
    DeviceType["MidiEffect"] = "midi_effect";
    DeviceType["Undefined"] = "undefined";
})(DeviceType || (exports.DeviceType = DeviceType = {}));
class Device extends _1.Namespace {
    raw;
    constructor(ableton, raw) {
        super(ableton, "device", raw.id);
        this.raw = raw;
        this.transformers = {
            parameters: (ps) => ps.map((p) => new device_parameter_1.DeviceParameter(ableton, p)),
        };
        this.cachedProps = {
            parameters: true,
        };
    }
}
exports.Device = Device;
