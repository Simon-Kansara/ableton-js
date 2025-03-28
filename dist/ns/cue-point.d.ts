import { Ableton } from "..";
import { Namespace } from ".";
export interface GettableProperties {
    name: string;
    time: number;
}
export interface TransformedProperties {
}
export interface SettableProperties {
}
export interface ObservableProperties {
    name: string;
    time: number;
}
export interface RawCuePoint {
    readonly id: string;
    readonly name: string;
    readonly time: number;
}
export declare class CuePoint extends Namespace<GettableProperties, TransformedProperties, SettableProperties, ObservableProperties> {
    raw: RawCuePoint;
    constructor(ableton: Ableton, raw: RawCuePoint);
    jump(): Promise<any>;
}
