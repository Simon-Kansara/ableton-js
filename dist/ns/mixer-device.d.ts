import { Ableton } from "..";
import { Namespace } from ".";
import { DeviceParameter, RawDeviceParameter } from "./device-parameter";
export declare enum PanningMode {
    Stereo = 0,
    StereoSplit = 1
}
export declare enum CrossfadeAssignment {
    A = 0,
    None = 1,
    B = 2
}
export interface GettableProperties {
    crossfade_assign: CrossfadeAssignment;
    crossfader: RawDeviceParameter;
    cue_volume: RawDeviceParameter;
    left_split_stereo: RawDeviceParameter;
    panning: RawDeviceParameter;
    panning_mode: PanningMode;
    right_split_stereo: RawDeviceParameter;
    sends: RawDeviceParameter[];
    song_tempo: RawDeviceParameter;
    track_activator: RawDeviceParameter;
    volume: RawDeviceParameter;
}
export interface TransformedProperties {
    crossfader: DeviceParameter;
    cue_volume: DeviceParameter;
    left_split_stereo: DeviceParameter;
    panning: DeviceParameter;
    right_split_stereo: DeviceParameter;
    sends: DeviceParameter[];
    song_tempo: DeviceParameter;
    track_activator: DeviceParameter;
    volume: DeviceParameter;
}
export interface SettableProperties {
    crossfade_assign: CrossfadeAssignment;
    panning_mode: string;
}
export interface ObservableProperties {
    crossfade_assign: CrossfadeAssignment;
    panning_mode: string;
    sends: RawDeviceParameter[];
}
export interface RawMixerDevice {
    id: string;
    volume: string;
}
export declare class MixerDevice extends Namespace<GettableProperties, TransformedProperties, SettableProperties, ObservableProperties> {
    raw: RawMixerDevice;
    constructor(ableton: Ableton, raw: RawMixerDevice);
}
