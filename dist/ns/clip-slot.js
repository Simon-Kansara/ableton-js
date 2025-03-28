"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClipSlot = exports.PlayingStatus = void 0;
const _1 = require(".");
const color_1 = require("../util/color");
const clip_1 = require("./clip");
var PlayingStatus;
(function (PlayingStatus) {
    PlayingStatus["Stopped"] = "stopped";
    PlayingStatus["Playing"] = "playing";
    PlayingStatus["Recording"] = "recording";
})(PlayingStatus || (exports.PlayingStatus = PlayingStatus = {}));
/**
 * This class represents an entry in Live's Session view matrix.
 */
class ClipSlot extends _1.Namespace {
    raw;
    constructor(ableton, raw) {
        super(ableton, "clip_slot", raw.id);
        this.raw = raw;
        this.transformers = {
            clip: (c) => (c ? new clip_1.Clip(ableton, c) : null),
            color: (c) => new color_1.Color(c),
        };
        this.cachedProps = {
            clip: true,
        };
    }
    /**
     * Creates an empty clip with the given length in the slot.
     * Throws an error when called on non-empty slots or slots in non-MIDI tracks.
     */
    createClip(length) {
        return this.sendCommand("create_clip", [length]);
    }
    /**
     * Removes the clip contained in the slot.
     * Raises an exception if the slot was empty.
     */
    deleteClip() {
        return this.sendCommand("delete_clip");
    }
    duplicateClipTo(slot) {
        return this.sendCommand("duplicate_clip_to", { slot_id: slot.raw.id });
    }
    /**
     * Fire a Clip if this Clipslot owns one,
     * else trigger the stop button, if we have one.
     */
    fire() {
        return this.sendCommand("fire");
    }
    /**
     * Set the ClipSlot's fire button state directly.
     * Supports all launch modes.
     */
    setFireButtonState(state) {
        return this.sendCommand("set_fire_button_state", [state]);
    }
    /**
     * Stop playing the contained Clip,
     * if there is a Clip and its currently playing.
     */
    stop() {
        return this.sendCommand("stop");
    }
}
exports.ClipSlot = ClipSlot;
