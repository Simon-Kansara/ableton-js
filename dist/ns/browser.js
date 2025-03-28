"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Browser = void 0;
const _1 = require(".");
const browser_item_1 = require("./browser-item");
class Browser extends _1.Namespace {
    constructor(ableton) {
        super(ableton, "browser");
        const makeBrowserItems = (items) => items.map((item) => new browser_item_1.BrowserItem(ableton, item));
        this.transformers = {
            audio_effects: makeBrowserItems,
            clips: makeBrowserItems,
            colors: makeBrowserItems,
            current_project: makeBrowserItems,
            drums: makeBrowserItems,
            instruments: makeBrowserItems,
            max_for_live: makeBrowserItems,
            midi_effects: makeBrowserItems,
            packs: makeBrowserItems,
            plugins: makeBrowserItems,
            samples: makeBrowserItems,
            sounds: makeBrowserItems,
            user_library: makeBrowserItems,
            user_folders: makeBrowserItems,
            hotswap_target: (t) => new browser_item_1.BrowserItem(ableton, t),
        };
        this.cachedProps = {
            audio_effects: true,
            clips: true,
            colors: true,
            current_project: true,
            drums: true,
            instruments: true,
            max_for_live: true,
            midi_effects: true,
            packs: true,
            plugins: true,
            samples: true,
            sounds: true,
            user_library: true,
            user_folders: true,
            hotswap_target: true,
        };
    }
    /** Loads the provided browser item. */
    async loadItem(item) {
        return this.sendCommand("load_item", { id: item.raw.id });
    }
    /** Previews the provided browser item. */
    async previewItem(item) {
        return this.sendCommand("preview_item", { id: item.raw.id });
    }
    /** Stops the current preview. */
    async stopPreview() {
        return this.sendCommand("stop_preview");
    }
}
exports.Browser = Browser;
