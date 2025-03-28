import { Ableton } from "..";
import { Namespace } from ".";
export declare enum MidiCommand {
    NoteOn = 128,
    NoteOff = 144,
    AfterTouch = 160,
    ControlChange = 176,
    PatchChange = 192,
    ChannelPressure = 208,
    PitchBend = 224,
    SysExStart = 240,
    MidiTimeCodeQuarterFrame = 241,
    SongPositionPointer = 242,
    SongSelect = 243,
    TuneRequest = 246,
    SysExEnd = 247,
    TimingClock = 248,
    Start = 250,
    Continue = 251,
    Stop = 252,
    ActiveSensing = 254,
    SystemReset = 255
}
export interface MidiMapping {
    type: "cc" | "note";
    channel: number;
    target: number;
}
export interface MidiNote {
    command: MidiCommand.NoteOn | MidiCommand.NoteOff;
    key: number;
    velocity: number;
}
export interface MidiCC {
    command: MidiCommand.ControlChange;
    controller: number;
    value: number;
}
export declare class MidiMessage {
    command: MidiCommand;
    parameter1: number | null;
    parameter2: number | null;
    constructor(raw: RawMidiMessage);
    toCC(): MidiCC;
    toNote(): MidiNote;
}
export interface RawMidiMessage {
    bytes: number[];
}
export interface GettableProperties {
}
export interface TransformedProperties {
    midi: MidiMessage;
}
export interface SettableProperties {
    midi_outputs: MidiMapping[];
}
export interface ObservableProperties {
    midi: RawMidiMessage;
}
export declare class Midi extends Namespace<GettableProperties, TransformedProperties, SettableProperties, ObservableProperties> {
    constructor(ableton: Ableton);
}
