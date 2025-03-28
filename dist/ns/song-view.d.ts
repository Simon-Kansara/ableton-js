import { Namespace } from ".";
import { Ableton } from "..";
import { Clip, RawClip } from "./clip";
import { ClipSlot, RawClipSlot } from "./clip-slot";
import { Device } from "./device";
import { DeviceParameter, RawDeviceParameter } from "./device-parameter";
import { RawScene, Scene } from "./scene";
import { RawTrack, Track } from "./track";
export interface GettableProperties {
    detail_clip: RawClip;
    draw_mode: boolean;
    follow_song: boolean;
    highlighted_clip_slot: RawClipSlot;
    selected_chain: any;
    selected_parameter: RawDeviceParameter;
    selected_scene: RawScene;
    selected_track: RawTrack;
}
export interface TransformedProperties {
    detail_clip: Clip;
    selected_parameter: DeviceParameter;
    selected_scene: Scene;
    selected_track: Track;
    highlighted_clip_slot: ClipSlot;
}
export interface SettableProperties {
    detail_clip: RawClip["id"];
    draw_mode: boolean;
    follow_song: boolean;
    highlighted_clip_slot: number;
    selected_scene: RawScene["id"];
    selected_track: RawTrack["id"];
}
export interface ObservableProperties {
    detail_clip: RawClip | null;
    draw_mode: any;
    follow_song: any;
    highlighted_clip_slot: any;
    selected_chain: any;
    selected_parameter: any;
    selected_scene: RawScene | null;
    selected_track: RawTrack | null;
}
export declare class SongView extends Namespace<GettableProperties, TransformedProperties, SettableProperties, ObservableProperties> {
    constructor(ableton: Ableton);
    selectDevice(device: Device): Promise<any>;
}
