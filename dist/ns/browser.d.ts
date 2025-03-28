import { Ableton } from "..";
import { Namespace } from ".";
import { BrowserItem, RawBrowserItem } from "./browser-item";
export interface GettableProperties {
    audio_effects: RawBrowserItem[];
    clips: RawBrowserItem[];
    colors: RawBrowserItem[];
    current_project: RawBrowserItem[];
    drums: RawBrowserItem[];
    instruments: RawBrowserItem[];
    max_for_live: RawBrowserItem[];
    midi_effects: RawBrowserItem[];
    packs: RawBrowserItem[];
    plugins: RawBrowserItem[];
    samples: RawBrowserItem[];
    sounds: RawBrowserItem[];
    user_library: RawBrowserItem[];
    user_folders: RawBrowserItem[];
    hotswap_target: RawBrowserItem;
}
export interface TransformedProperties {
    audio_effects: BrowserItem[];
    clips: BrowserItem[];
    colors: BrowserItem[];
    current_project: BrowserItem[];
    drums: BrowserItem[];
    instruments: BrowserItem[];
    max_for_live: BrowserItem[];
    midi_effects: BrowserItem[];
    packs: BrowserItem[];
    plugins: BrowserItem[];
    samples: BrowserItem[];
    sounds: BrowserItem[];
    user_library: BrowserItem[];
    user_folders: BrowserItem[];
    hotswap_target: BrowserItem;
}
export interface SettableProperties {
}
export interface ObservableProperties {
    filter_type: never;
    hotswap_target: BrowserItem;
}
export interface RawBrowser {
    readonly id: string;
}
export declare class Browser extends Namespace<GettableProperties, TransformedProperties, SettableProperties, ObservableProperties> {
    constructor(ableton: Ableton);
    /** Loads the provided browser item. */
    loadItem(item: BrowserItem): Promise<any>;
    /** Previews the provided browser item. */
    previewItem(item: BrowserItem): Promise<any>;
    /** Stops the current preview. */
    stopPreview(): Promise<any>;
}
