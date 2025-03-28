import { Ableton } from "..";
import { Namespace } from ".";
import { ApplicationView } from "./application-view";
import { Browser, RawBrowser } from "./browser";
export interface GettableProperties {
    bugfix_version: number;
    major_version: number;
    minor_version: number;
    version: string;
    current_dialog_button_count: number;
    current_dialog_message: string;
    open_dialog_count: number;
    browser: RawBrowser;
}
export interface TransformedProperties {
    browser: Browser;
}
export interface SettableProperties {
}
export interface ObservableProperties {
    open_dialog_count: number;
}
export declare class Application extends Namespace<GettableProperties, TransformedProperties, SettableProperties, ObservableProperties> {
    constructor(ableton: Ableton);
    browser: Browser;
    view: ApplicationView;
    pressCurrentDialogButton(index: number): Promise<any>;
}
