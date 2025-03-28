import { Ableton } from "..";
import { Namespace } from ".";
export interface GettableProperties {
    automation_state: AutomationState;
    default_value: string;
    is_enabled: boolean;
    is_quantized: boolean;
    max: number;
    min: number;
    name: string;
    original_name: string;
    state: ParameterState;
    value: number;
    value_items: string[];
}
export interface TransformedProperties {
}
export interface SettableProperties {
    value: number;
}
export interface ObservableProperties {
    automation_state: AutomationState;
    name: string;
    state: ParameterState;
    value: number;
}
export interface RawDeviceParameter {
    readonly id: string;
    readonly name: string;
    readonly value: number;
    readonly is_quantized: boolean;
}
export declare enum AutomationState {
    None = 0,
    Playing = 1,
    Overridden = 2
}
export declare enum ParameterState {
    Enabled = 0,
    Disabled = 1,
    Irrelevant = 2
}
export declare class DeviceParameter extends Namespace<GettableProperties, TransformedProperties, SettableProperties, ObservableProperties> {
    raw: RawDeviceParameter;
    constructor(ableton: Ableton, raw: RawDeviceParameter);
}
