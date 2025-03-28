"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeviceParameter = exports.ParameterState = exports.AutomationState = void 0;
const _1 = require(".");
var AutomationState;
(function (AutomationState) {
    AutomationState[AutomationState["None"] = 0] = "None";
    AutomationState[AutomationState["Playing"] = 1] = "Playing";
    AutomationState[AutomationState["Overridden"] = 2] = "Overridden";
})(AutomationState || (exports.AutomationState = AutomationState = {}));
var ParameterState;
(function (ParameterState) {
    ParameterState[ParameterState["Enabled"] = 0] = "Enabled";
    ParameterState[ParameterState["Disabled"] = 1] = "Disabled";
    ParameterState[ParameterState["Irrelevant"] = 2] = "Irrelevant";
})(ParameterState || (exports.ParameterState = ParameterState = {}));
class DeviceParameter extends _1.Namespace {
    raw;
    constructor(ableton, raw) {
        super(ableton, "device-parameter", raw.id);
        this.raw = raw;
    }
}
exports.DeviceParameter = DeviceParameter;
