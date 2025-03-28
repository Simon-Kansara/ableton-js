import { Ableton } from "..";
import { Namespace } from ".";
import { Device, RawDevice } from "./device";
export declare enum DeviceInsertMode {
    Default = "default",
    Left = "left",
    Right = "right"
}
export interface GettableProperties {
    is_collapsed: boolean;
    selected_device: RawDevice;
}
export interface TransformedProperties {
    selected_device: Device;
}
export interface SettableProperties {
    device_insert_mode: DeviceInsertMode;
    is_collapsed: boolean;
}
export interface ObservableProperties {
    is_collapsed: boolean;
    selected_device: RawDevice;
}
export declare class TrackView extends Namespace<GettableProperties, TransformedProperties, SettableProperties, ObservableProperties> {
    constructor(ableton: Ableton, nsid: string);
    /**
     * Selects the track's instrument if it has one.
     */
    selectInstrument(): Promise<any>;
}
