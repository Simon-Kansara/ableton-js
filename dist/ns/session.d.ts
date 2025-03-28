import { Ableton } from "..";
import { Namespace } from ".";
export interface GettableProperties {
}
export interface TransformedProperties {
}
export interface SettableProperties {
}
export interface ObservableProperties {
}
export declare class Session extends Namespace<GettableProperties, TransformedProperties, SettableProperties, ObservableProperties> {
    constructor(ableton: Ableton);
    setupSessionBox(num_tracks: number, num_scenes: number): Promise<any>;
    setSessionOffset(track_offset: number, scene_offset: number): Promise<any>;
}
