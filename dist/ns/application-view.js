"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApplicationView = exports.NavDirection = void 0;
const _1 = require(".");
var NavDirection;
(function (NavDirection) {
    NavDirection[NavDirection["Up"] = 0] = "Up";
    NavDirection[NavDirection["Down"] = 1] = "Down";
    NavDirection[NavDirection["Left"] = 2] = "Left";
    NavDirection[NavDirection["Right"] = 3] = "Right";
})(NavDirection || (exports.NavDirection = NavDirection = {}));
class ApplicationView extends _1.Namespace {
    constructor(ableton) {
        super(ableton, "application-view");
    }
    async availableMainViews() {
        return this.sendCachedCommand("available_main_views");
    }
    async focusView(view) {
        return this.sendCommand("focus_view", [view]);
    }
    async hideView(view) {
        return this.sendCommand("hide_view", [view]);
    }
    async isViewVisible(view, mainWindowOnly = true) {
        return this.sendCommand("is_view_visible", [view, mainWindowOnly]);
    }
    async scrollView(view, direction) {
        return this.sendCommand("scroll_view", [direction, view, true]);
    }
    async showView(view) {
        return this.sendCommand("show_view", [view]);
    }
    async toggleBrowse() {
        return this.sendCommand("toggle_browse");
    }
    async zoomView(view, direction) {
        return this.sendCommand("zoom_view", [direction, view, true]);
    }
}
exports.ApplicationView = ApplicationView;
