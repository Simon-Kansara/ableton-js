import { Ableton } from "..";
import { Namespace } from ".";
export interface GettableProperties {
    children: RawBrowserItem[];
    is_device: boolean;
    is_folder: boolean;
    is_loadable: boolean;
    is_selected: boolean;
    name: string;
    source: string;
    uri: string;
}
export interface TransformedProperties {
    children: BrowserItem[];
}
export interface SettableProperties {
}
export interface ObservableProperties {
}
export interface RawBrowserItem {
    readonly id: string;
    readonly children: RawBrowserItem[];
    readonly name: string;
    readonly is_loadable: boolean;
    readonly is_selected: boolean;
    readonly is_device: boolean;
    readonly is_folder: boolean;
    readonly source: string;
    readonly uri: string;
}
export declare class BrowserItem extends Namespace<GettableProperties, TransformedProperties, SettableProperties, ObservableProperties> {
    raw: RawBrowserItem;
    constructor(ableton: Ableton, raw: RawBrowserItem);
}
