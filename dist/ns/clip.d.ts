import { Ableton } from "..";
import { Namespace } from ".";
import { Color } from "../util/color";
import { DeviceParameter } from "./device-parameter";
import { Note, NoteTuple } from "../util/note";
export declare enum WarpMode {
    Beats = 0,
    Tones = 1,
    Texture = 2,
    Repitch = 3,
    Complex = 4,
    ComplexPro = 6
}
export declare enum LaunchMode {
    Trigger = 0,
    Gate = 1,
    Toggle = 2,
    Repeat = 3
}
export declare enum LaunchQuantization {
    QGlobal = 0,
    QNone = 1,
    Q8Bars = 2,
    Q4Bars = 3,
    Q2Bars = 4,
    QBar = 5,
    QHalf = 6,
    QHalfTriplet = 7,
    QQuarter = 8,
    QQuarterTriplet = 9,
    QEighth = 10,
    QEighthTriplet = 11,
    QSixteenth = 12,
    QSixteenthTriplet = 13,
    QThirtySecond = 14
}
interface WarpMarker {
    beat_time: number;
    sample_time: number;
}
export interface GettableProperties {
    available_warp_modes: WarpMode[];
    color: number;
    color_index: number;
    end_marker: number;
    end_time: number;
    file_path: string;
    gain: number;
    gain_display_string: string;
    has_envelopes: boolean;
    is_arrangement_clip: boolean;
    is_audio_clip: boolean;
    is_midi_clip: boolean;
    is_overdubbing: boolean;
    is_playing: boolean;
    is_recording: boolean;
    is_triggered: boolean;
    launch_mode: LaunchMode;
    launch_quantization: LaunchQuantization;
    length: number;
    loop_end: number;
    loop_start: number;
    looping: boolean;
    muted: boolean;
    name: string;
    pitch_coarse: number;
    pitch_fine: number;
    playing_position: number;
    position: number;
    ram_mode: boolean;
    sample_length: number;
    selected_notes: NoteTuple[];
    signature_denominator: number;
    signature_numerator: number;
    start_marker: number;
    start_time: number;
    velocity_amount: number;
    warp_mode: WarpMode;
    warp_markers: WarpMarker[];
    warping: boolean;
    will_record_on_start: boolean;
}
export interface TransformedProperties {
    color: Color;
    notes: Note[];
    selected_notes: Note[];
}
export interface SettableProperties {
    name: string;
    color: Color | number;
    color_index: number;
    end_marker: number;
    gain: number;
    is_playing: boolean;
    launch_mode: LaunchMode;
    launch_quantization: LaunchQuantization;
    loop_end: number;
    loop_start: number;
    looping: boolean;
    muted: boolean;
    pitch_coarse: number;
    pitch_fine: number;
    position: number;
    ram_mode: boolean;
    signature_denominator: number;
    signature_numerator: number;
    start_marker: number;
    velocity_amount: number;
    warp_mode: WarpMode;
    warping: boolean;
}
export interface ObservableProperties {
    color_index: number;
    color: number;
    end_marker: number;
    end_time: number;
    file_path: string;
    gain: number;
    has_envelopes: boolean;
    is_overdubbing: boolean;
    is_recording: boolean;
    loop_end: number;
    loop_start: number;
    muted: boolean;
    name: string;
    notes: NoteTuple[];
    pitch_coarse: number;
    pitch_fine: number;
    playing_position: number;
    position: number;
    signature_denominator: number;
    signature_numerator: number;
    start_marker: number;
    warp_markers: unknown;
    warping: boolean;
}
export interface RawClip {
    readonly id: string;
    readonly name: string;
    readonly color: number;
    readonly color_index: number;
    readonly is_audio_clip: boolean;
    readonly is_midi_clip: boolean;
    readonly start_time: number;
    readonly end_time: number;
    readonly muted: boolean;
}
/**
 * This class represents an entry in Live's Session view matrix.
 */
export declare class Clip extends Namespace<GettableProperties, TransformedProperties, SettableProperties, ObservableProperties> {
    raw: RawClip;
    constructor(ableton: Ableton, raw: RawClip);
    /**
     * Available for audio clips only.
     * Converts the given beat time to sample time.
     * Raises an error if the sample is not warped.
     */
    beatToSampleTime(beats: number): Promise<number>;
    /**
     * Clears all envelopes for this clip.
     */
    clearAllEnvelopes(): Promise<void>;
    /**
     * Clears the envelope of this clip's given parameter.
     */
    clearEnvelope(parameter: DeviceParameter): Promise<void>;
    /**
     * Creates an envelope for a given parameter and returns it.
     * This should only be used if the envelope doesn't exist.
     * Raises an error if the the envelope can't be created.
     */
    private createAutomationEnvelope;
    /**
     * Crops the clip. The region that is cropped depends on whether
     * the clip is looped or not. If looped, the region outside of
     * the loop is removed. If not looped, the region outside
     * the start and end markers is removed.
     */
    crop(): Promise<void>;
    /**
     * Deselects all notes present in the clip.
     */
    deselectAllNotes(): Promise<void>;
    /**
     * Makes the loop twice as long and duplicates notes and envelopes.
     * Duplicates the clip start/end range if the clip is not looped.
     */
    duplicateLoop(): Promise<void>;
    /**
     * Duplicates the notes in the specified region to the destination_time.
     * Only notes of the specified pitch are duplicated if pitch is not -1.
     * If the transposition_amount is not 0, the notes in the region will be
     * transposed by the transposition_amount of semitones.
     * Raises an error on audio clips.
     */
    duplicateRegion(start: number, length: number, destinationTime: number, pitch?: number, transpositionAmount?: number): Promise<void>;
    /**
     * Starts playing this clip.
     */
    fire(): Promise<void>;
    /**
     * Returns all notes that match the given range.
     */
    getNotes(fromTime: number, fromPitch: number, timeSpan: number, pitchSpan: number): Promise<Note[]>;
    /**
     * Jump forward or backward by the specified relative amount in beats.
     * Will do nothing if the clip is not playing.
     */
    movePlayingPos(amount: number): Promise<void>;
    /**
     * Quantizes all notes in a clip or aligns warp markers.
     */
    quantize(grid: number, amount: number): Promise<void>;
    /**
     * Quantizes all the notes of a given pitch.
     */
    quantizePitch(pitch: number, grid: number, amount: number): Promise<void>;
    /**
     * Deletes all notes that start in the given area.
     *
     * @deprecated starting with Live 11, use `removeNotesExtended` instead
     */
    removeNotes(fromTime: number, fromPitch: number, timeSpan: number, pitchSpan: number): Promise<any>;
    /**
     * Deletes all notes that start in the given area.
     */
    removeNotesExtended(fromTime: number, fromPitch: number, timeSpan: number, pitchSpan: number): Promise<any>;
    /**
     * Replaces selected notes with an array of new notes.
     */
    replaceSelectedNotes(notes: Note[]): Promise<any>;
    /**
     * Available for audio clips only.
     * Converts the given sample time to beat time.
     * Raises an error if the sample is not warped.
     */
    sampleToBeatTime(sampleTime: number): Promise<number>;
    /**
     * Scrubs inside a clip.
     * `position` defines the position in beats that the scrub will start from.
     * The scrub will continue until `stop_scrub` is called.
     * Global quantization applies to the scrub's position and length.
     */
    scrub(position: number): Promise<void>;
    /**
     * Available for audio clips only.
     * Converts the given seconds to sample time.
     * Raises an error if the sample is warped.
     */
    secondsToSampleTime(seconds: number): Promise<number>;
    /**
     * Selects all notes present in the clip.
     */
    selectAllNotes(): Promise<void>;
    /**
     * Set the clip's fire button state directly.
     * Supports all launch modes.
     */
    setFireButtonState(state: boolean): Promise<void>;
    /**
     * Adds the given notes to the clip.
     */
    setNotes(notes: Note[]): Promise<void>;
    /**
     * Stop playig this clip.
     */
    stop(): Promise<void>;
    /**
     * Stops the current scrub.
     */
    stopScrub(): Promise<void>;
}
export {};
