import { Ableton } from "..";
import { Namespace } from ".";
import { RawDeviceParameter, DeviceParameter } from "./device-parameter";
export interface GettableProperties {
    can_have_chains: boolean;
    can_have_drum_pads: boolean;
    class_display_name: string;
    class_name: string;
    is_active: boolean;
    name: string;
    parameters: RawDeviceParameter[];
    type: DeviceType;
}
export interface TransformedProperties {
    parameters: DeviceParameter[];
}
export interface SettableProperties {
    name: string;
}
export interface ObservableProperties {
    is_active: boolean;
    name: string;
    parameters: string;
}
export interface RawDevice {
    readonly id: string;
    readonly name: string;
    readonly type: DeviceType;
    readonly class_name: string;
}
export declare enum DeviceType {
    AudioEffect = "audio_effect",
    Instrument = "instrument",
    MidiEffect = "midi_effect",
    Undefined = "undefined"
}
export declare class Device extends Namespace<GettableProperties, TransformedProperties, SettableProperties, ObservableProperties> {
    raw: RawDevice;
    constructor(ableton: Ableton, raw: RawDevice);
}
