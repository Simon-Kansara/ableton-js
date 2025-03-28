import { Ableton } from "..";
import { Namespace } from ".";
import { Color } from "../util/color";
import { Clip, RawClip } from "./clip";
export declare enum PlayingStatus {
    Stopped = "stopped",
    Playing = "playing",
    Recording = "recording"
}
export interface GettableProperties {
    clip: RawClip | null;
    color: number;
    color_index: number;
    controls_other_clips: boolean;
    has_clip: boolean;
    has_stop_button: boolean;
    is_group_slot: boolean;
    is_playing: boolean;
    is_recording: boolean;
    is_triggered: boolean;
    playing_status: PlayingStatus;
    will_record_on_start: boolean;
}
export interface TransformedProperties {
    clip: Clip | null;
    color: Color;
}
export interface SettableProperties {
    name: string;
    color: number;
}
export interface ObservableProperties {
    color_index: number;
    color: number;
    controls_other_clips: boolean;
    has_clip: boolean;
    has_stop_button: boolean;
    is_triggered: boolean;
    playing_status: PlayingStatus;
}
export interface RawClipSlot {
    readonly id: string;
    readonly color: number;
    readonly has_clip: boolean;
    readonly is_playing: boolean;
    readonly is_recording: boolean;
    readonly is_triggered: boolean;
}
/**
 * This class represents an entry in Live's Session view matrix.
 */
export declare class ClipSlot extends Namespace<GettableProperties, TransformedProperties, SettableProperties, ObservableProperties> {
    raw: RawClipSlot;
    constructor(ableton: Ableton, raw: RawClipSlot);
    /**
     * Creates an empty clip with the given length in the slot.
     * Throws an error when called on non-empty slots or slots in non-MIDI tracks.
     */
    createClip(length: number): Promise<any>;
    /**
     * Removes the clip contained in the slot.
     * Raises an exception if the slot was empty.
     */
    deleteClip(): Promise<any>;
    duplicateClipTo(slot: ClipSlot): Promise<any>;
    /**
     * Fire a Clip if this Clipslot owns one,
     * else trigger the stop button, if we have one.
     */
    fire(): Promise<any>;
    /**
     * Set the ClipSlot's fire button state directly.
     * Supports all launch modes.
     */
    setFireButtonState(state: boolean): Promise<any>;
    /**
     * Stop playing the contained Clip,
     * if there is a Clip and its currently playing.
     */
    stop(): Promise<any>;
}
