import { Ableton } from "..";
import { Namespace } from ".";
import { ClipSlot, RawClipSlot } from "./clip-slot";
import { Color } from "../util/color";
export interface GettableProperties {
    clip_slots: RawClipSlot[];
    color: number;
    color_index: number;
    is_empty: boolean;
    is_triggered: boolean;
    name: string;
    tempo: number;
}
export interface TransformedProperties {
    color: Color;
    clip_slots: ClipSlot[];
}
export interface SettableProperties {
    clip_slots: RawClipSlot[];
    color: number;
    color_index: number;
    name: string;
    tempo: number;
}
export interface ObservableProperties {
    clip_slots: RawClipSlot[];
    color: number;
    color_index: number;
    is_triggered: boolean;
    name: string;
}
export interface RawScene {
    readonly color: number;
    readonly id: string;
    readonly name: string;
}
export declare class Scene extends Namespace<GettableProperties, TransformedProperties, SettableProperties, ObservableProperties> {
    raw: RawScene;
    constructor(ableton: Ableton, raw: RawScene);
    /**
     * Fire the scene directly. Will fire all clip slots
     * that this scene owns and select the scene itself.
     */
    fire(): Promise<any>;
}
