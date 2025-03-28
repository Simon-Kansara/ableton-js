"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BrowserItem = void 0;
const _1 = require(".");
class BrowserItem extends _1.Namespace {
    raw;
    constructor(ableton, raw) {
        super(ableton, "browser-item", raw.id);
        this.raw = raw;
        this.transformers = {
            children: (children) => children.map((c) => new BrowserItem(ableton, c)),
        };
        this.cachedProps = {
            children: true,
            is_device: true,
            is_folder: true,
            is_loadable: false,
            is_selected: false,
            name: true,
            source: true,
            uri: true,
        };
    }
}
exports.BrowserItem = BrowserItem;
