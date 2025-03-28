"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Clip = exports.LaunchQuantization = exports.LaunchMode = exports.WarpMode = void 0;
const _1 = require(".");
const color_1 = require("../util/color");
const note_1 = require("../util/note");
var WarpMode;
(function (WarpMode) {
    WarpMode[WarpMode["Beats"] = 0] = "Beats";
    WarpMode[WarpMode["Tones"] = 1] = "Tones";
    WarpMode[WarpMode["Texture"] = 2] = "Texture";
    WarpMode[WarpMode["Repitch"] = 3] = "Repitch";
    WarpMode[WarpMode["Complex"] = 4] = "Complex";
    WarpMode[WarpMode["ComplexPro"] = 6] = "ComplexPro";
})(WarpMode || (exports.WarpMode = WarpMode = {}));
var LaunchMode;
(function (LaunchMode) {
    LaunchMode[LaunchMode["Trigger"] = 0] = "Trigger";
    LaunchMode[LaunchMode["Gate"] = 1] = "Gate";
    LaunchMode[LaunchMode["Toggle"] = 2] = "Toggle";
    LaunchMode[LaunchMode["Repeat"] = 3] = "Repeat";
})(LaunchMode || (exports.LaunchMode = LaunchMode = {}));
var LaunchQuantization;
(function (LaunchQuantization) {
    LaunchQuantization[LaunchQuantization["QGlobal"] = 0] = "QGlobal";
    LaunchQuantization[LaunchQuantization["QNone"] = 1] = "QNone";
    LaunchQuantization[LaunchQuantization["Q8Bars"] = 2] = "Q8Bars";
    LaunchQuantization[LaunchQuantization["Q4Bars"] = 3] = "Q4Bars";
    LaunchQuantization[LaunchQuantization["Q2Bars"] = 4] = "Q2Bars";
    LaunchQuantization[LaunchQuantization["QBar"] = 5] = "QBar";
    LaunchQuantization[LaunchQuantization["QHalf"] = 6] = "QHalf";
    LaunchQuantization[LaunchQuantization["QHalfTriplet"] = 7] = "QHalfTriplet";
    LaunchQuantization[LaunchQuantization["QQuarter"] = 8] = "QQuarter";
    LaunchQuantization[LaunchQuantization["QQuarterTriplet"] = 9] = "QQuarterTriplet";
    LaunchQuantization[LaunchQuantization["QEighth"] = 10] = "QEighth";
    LaunchQuantization[LaunchQuantization["QEighthTriplet"] = 11] = "QEighthTriplet";
    LaunchQuantization[LaunchQuantization["QSixteenth"] = 12] = "QSixteenth";
    LaunchQuantization[LaunchQuantization["QSixteenthTriplet"] = 13] = "QSixteenthTriplet";
    LaunchQuantization[LaunchQuantization["QThirtySecond"] = 14] = "QThirtySecond";
})(LaunchQuantization || (exports.LaunchQuantization = LaunchQuantization = {}));
/**
 * This class represents an entry in Live's Session view matrix.
 */
class Clip extends _1.Namespace {
    raw;
    constructor(ableton, raw) {
        super(ableton, "clip", raw.id);
        this.raw = raw;
        this.transformers = {
            color: (c) => new color_1.Color(c),
            notes: (n) => n.map(note_1.tupleToNote),
            selected_notes: (n) => n.map(note_1.tupleToNote),
        };
    }
    /**
     * Available for audio clips only.
     * Converts the given beat time to sample time.
     * Raises an error if the sample is not warped.
     */
    beatToSampleTime(beats) {
        return this.sendCommand("beat_to_sample_time", [beats]);
    }
    /**
     * Clears all envelopes for this clip.
     */
    clearAllEnvelopes() {
        return this.sendCommand("clear_all_envelopes");
    }
    /**
     * Clears the envelope of this clip's given parameter.
     */
    clearEnvelope(parameter) {
        return this.sendCommand("clear_envelope", { parameter });
    }
    /**
     * Creates an envelope for a given parameter and returns it.
     * This should only be used if the envelope doesn't exist.
     * Raises an error if the the envelope can't be created.
     */
    createAutomationEnvelope() { }
    /**
     * Crops the clip. The region that is cropped depends on whether
     * the clip is looped or not. If looped, the region outside of
     * the loop is removed. If not looped, the region outside
     * the start and end markers is removed.
     */
    crop() {
        return this.sendCommand("crop");
    }
    /**
     * Deselects all notes present in the clip.
     */
    deselectAllNotes() {
        return this.sendCommand("deselect_all_notes");
    }
    /**
     * Makes the loop twice as long and duplicates notes and envelopes.
     * Duplicates the clip start/end range if the clip is not looped.
     */
    duplicateLoop() {
        return this.sendCommand("duplicate_loop");
    }
    /**
     * Duplicates the notes in the specified region to the destination_time.
     * Only notes of the specified pitch are duplicated if pitch is not -1.
     * If the transposition_amount is not 0, the notes in the region will be
     * transposed by the transposition_amount of semitones.
     * Raises an error on audio clips.
     */
    duplicateRegion(start, length, destinationTime, pitch = -1, transpositionAmount = 0) {
        return this.sendCommand("duplicate_region", [
            start,
            length,
            destinationTime,
            pitch,
            transpositionAmount,
        ]);
    }
    /**
     * Starts playing this clip.
     */
    fire() {
        return this.sendCommand("fire");
    }
    /**
     * Returns all notes that match the given range.
     */
    async getNotes(fromTime, fromPitch, timeSpan, pitchSpan) {
        const notes = await this.sendCommand("get_notes", {
            from_time: fromTime,
            from_pitch: fromPitch,
            time_span: timeSpan,
            pitch_span: pitchSpan,
        });
        return notes.map(note_1.tupleToNote);
    }
    /**
     * Jump forward or backward by the specified relative amount in beats.
     * Will do nothing if the clip is not playing.
     */
    movePlayingPos(amount) {
        return this.sendCommand("move_playing_pos", [amount]);
    }
    /**
     * Quantizes all notes in a clip or aligns warp markers.
     */
    quantize(grid, amount) {
        return this.sendCommand("quantize", [grid, amount]);
    }
    /**
     * Quantizes all the notes of a given pitch.
     */
    quantizePitch(pitch, grid, amount) {
        return this.sendCommand("quantize_pitch", [pitch, grid, amount]);
    }
    /**
     * Deletes all notes that start in the given area.
     *
     * @deprecated starting with Live 11, use `removeNotesExtended` instead
     */
    removeNotes(fromTime, fromPitch, timeSpan, pitchSpan) {
        return this.sendCommand("remove_notes", [
            fromTime,
            fromPitch,
            timeSpan,
            pitchSpan,
        ]);
    }
    /**
     * Deletes all notes that start in the given area.
     */
    removeNotesExtended(fromTime, fromPitch, timeSpan, pitchSpan) {
        return this.sendCommand("remove_notes_extended", [
            fromTime,
            fromPitch,
            timeSpan,
            pitchSpan,
        ]);
    }
    /**
     * Replaces selected notes with an array of new notes.
     */
    replaceSelectedNotes(notes) {
        return this.sendCommand("replace_selected_notes", {
            notes: notes.map(note_1.noteToTuple),
        });
    }
    /**
     * Available for audio clips only.
     * Converts the given sample time to beat time.
     * Raises an error if the sample is not warped.
     */
    sampleToBeatTime(sampleTime) {
        return this.sendCommand("sample_to_beat_time", [sampleTime]);
    }
    /**
     * Scrubs inside a clip.
     * `position` defines the position in beats that the scrub will start from.
     * The scrub will continue until `stop_scrub` is called.
     * Global quantization applies to the scrub's position and length.
     */
    scrub(position) {
        return this.sendCommand("scrub", [position]);
    }
    /**
     * Available for audio clips only.
     * Converts the given seconds to sample time.
     * Raises an error if the sample is warped.
     */
    secondsToSampleTime(seconds) {
        return this.sendCommand("seconds_to_sample_time", [seconds]);
    }
    /**
     * Selects all notes present in the clip.
     */
    selectAllNotes() {
        return this.sendCommand("select_all_notes");
    }
    /**
     * Set the clip's fire button state directly.
     * Supports all launch modes.
     */
    setFireButtonState(state) {
        return this.sendCommand("set_fire_button_state", [state]);
    }
    /**
     * Adds the given notes to the clip.
     */
    setNotes(notes) {
        return this.sendCommand("set_notes", { notes: notes.map(note_1.noteToTuple) });
    }
    /**
     * Stop playig this clip.
     */
    stop() {
        return this.sendCommand("stop");
    }
    /**
     * Stops the current scrub.
     */
    stopScrub() {
        return this.sendCommand("stop_scrub");
    }
}
exports.Clip = Clip;
