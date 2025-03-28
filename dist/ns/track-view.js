"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TrackView = exports.DeviceInsertMode = void 0;
const _1 = require(".");
const device_1 = require("./device");
var DeviceInsertMode;
(function (DeviceInsertMode) {
    DeviceInsertMode["Default"] = "default";
    DeviceInsertMode["Left"] = "left";
    DeviceInsertMode["Right"] = "right";
})(DeviceInsertMode || (exports.DeviceInsertMode = DeviceInsertMode = {}));
class TrackView extends _1.Namespace {
    constructor(ableton, nsid) {
        super(ableton, "track-view", nsid);
        this.transformers = {
            selected_device: (device) => new device_1.Device(ableton, device),
        };
        this.cachedProps = {
            selected_device: true,
        };
    }
    /**
     * Selects the track's instrument if it has one.
     */
    async selectInstrument() {
        return this.sendCommand("select_instrument");
    }
}
exports.TrackView = TrackView;
