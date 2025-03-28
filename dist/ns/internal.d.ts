import { Ableton } from "..";
import { Namespace } from ".";
export interface GettableProperties {
    version: string;
    ping: boolean;
}
export interface TransformedProperties {
}
export interface SettableProperties {
}
export interface ObservableProperties {
}
export declare class Internal extends Namespace<GettableProperties, TransformedProperties, SettableProperties, ObservableProperties> {
    constructor(ableton: Ableton);
    isPluginUpToDate(): Promise<boolean>;
}
