import { Ableton } from "..";
import { Namespace } from ".";
export type DocumentView = "Session" | "Arranger";
export type DetailView = "Detail" | "Detail/Clip" | "Detail/DeviceChain";
export type View = "Browser" | DocumentView | DetailView;
export declare enum NavDirection {
    Up = 0,
    Down = 1,
    Left = 2,
    Right = 3
}
export interface GettableProperties {
    browse_mode: boolean;
    focused_document_view: DocumentView;
}
export interface TransformedProperties {
}
export interface SettableProperties {
}
export interface ObservableProperties {
    browse_mode: boolean;
    focused_document_view: DocumentView;
}
export declare class ApplicationView extends Namespace<GettableProperties, TransformedProperties, SettableProperties, ObservableProperties> {
    constructor(ableton: Ableton);
    availableMainViews(): Promise<View[]>;
    focusView(view: View): Promise<any>;
    hideView(view: View): Promise<any>;
    isViewVisible(view: View, mainWindowOnly?: boolean): Promise<any>;
    scrollView(view: View, direction: NavDirection): Promise<any>;
    showView(view: View): Promise<any>;
    toggleBrowse(): Promise<any>;
    zoomView(view: View, direction: NavDirection): Promise<any>;
}
