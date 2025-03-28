"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Scene = void 0;
const _1 = require(".");
const clip_slot_1 = require("./clip-slot");
const color_1 = require("../util/color");
class Scene extends _1.Namespace {
    raw;
    constructor(ableton, raw) {
        super(ableton, "scene", raw.id);
        this.raw = raw;
        this.transformers = {
            color: (c) => new color_1.Color(c),
            clip_slots: (clip_slots) => clip_slots.map((c) => new clip_slot_1.ClipSlot(this.ableton, c)),
        };
        this.cachedProps = {
            clip_slots: true,
        };
    }
    /**
     * Fire the scene directly. Will fire all clip slots
     * that this scene owns and select the scene itself.
     */
    async fire() {
        return this.sendCommand("fire");
    }
}
exports.Scene = Scene;
