"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Midi = exports.MidiMessage = exports.MidiCommand = void 0;
const _1 = require(".");
var MidiCommand;
(function (MidiCommand) {
    MidiCommand[MidiCommand["NoteOn"] = 128] = "NoteOn";
    MidiCommand[MidiCommand["NoteOff"] = 144] = "NoteOff";
    MidiCommand[MidiCommand["AfterTouch"] = 160] = "AfterTouch";
    MidiCommand[MidiCommand["ControlChange"] = 176] = "ControlChange";
    MidiCommand[MidiCommand["PatchChange"] = 192] = "PatchChange";
    MidiCommand[MidiCommand["ChannelPressure"] = 208] = "ChannelPressure";
    MidiCommand[MidiCommand["PitchBend"] = 224] = "PitchBend";
    MidiCommand[MidiCommand["SysExStart"] = 240] = "SysExStart";
    MidiCommand[MidiCommand["MidiTimeCodeQuarterFrame"] = 241] = "MidiTimeCodeQuarterFrame";
    MidiCommand[MidiCommand["SongPositionPointer"] = 242] = "SongPositionPointer";
    MidiCommand[MidiCommand["SongSelect"] = 243] = "SongSelect";
    MidiCommand[MidiCommand["TuneRequest"] = 246] = "TuneRequest";
    MidiCommand[MidiCommand["SysExEnd"] = 247] = "SysExEnd";
    MidiCommand[MidiCommand["TimingClock"] = 248] = "TimingClock";
    MidiCommand[MidiCommand["Start"] = 250] = "Start";
    MidiCommand[MidiCommand["Continue"] = 251] = "Continue";
    MidiCommand[MidiCommand["Stop"] = 252] = "Stop";
    MidiCommand[MidiCommand["ActiveSensing"] = 254] = "ActiveSensing";
    MidiCommand[MidiCommand["SystemReset"] = 255] = "SystemReset";
})(MidiCommand || (exports.MidiCommand = MidiCommand = {}));
class MidiMessage {
    command;
    parameter1 = null;
    parameter2 = null;
    constructor(raw) {
        switch (raw.bytes.length) {
            case 0:
                throw "bytes missing from midi message";
            case 3:
                this.parameter1 = raw.bytes[1];
                this.parameter2 = raw.bytes[2];
                break;
            case 2:
                this.parameter1 = raw.bytes[1];
                break;
            case 1:
                break;
            default:
                throw "invalid midi message length: " + raw.bytes.length;
        }
        if (!(raw.bytes[0] in MidiCommand)) {
            throw "invalid midi command: " + raw.bytes[0];
        }
        this.command = raw.bytes[0];
    }
    toCC() {
        if (this.command !== MidiCommand.ControlChange) {
            throw "not a midi CC message";
        }
        return {
            command: this.command,
            controller: this.parameter1,
            value: this.parameter2,
        };
    }
    toNote() {
        if (this.command !== MidiCommand.NoteOn &&
            this.command !== MidiCommand.NoteOff) {
            throw "not a midi note message";
        }
        return {
            command: this.command,
            key: this.parameter1,
            velocity: this.parameter2,
        };
    }
}
exports.MidiMessage = MidiMessage;
class Midi extends _1.Namespace {
    constructor(ableton) {
        super(ableton, "midi");
        this.transformers = {
            midi: (msg) => new MidiMessage(msg),
        };
    }
}
exports.Midi = Midi;
