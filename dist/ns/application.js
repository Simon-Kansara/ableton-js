"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Application = void 0;
const _1 = require(".");
const application_view_1 = require("./application-view");
const browser_1 = require("./browser");
class Application extends _1.Namespace {
    constructor(ableton) {
        super(ableton, "application");
    }
    browser = new browser_1.Browser(this.ableton);
    view = new application_view_1.ApplicationView(this.ableton);
    async pressCurrentDialogButton(index) {
        return this.sendCommand("press_current_dialog_button", [index]);
    }
}
exports.Application = Application;
