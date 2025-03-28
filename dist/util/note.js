"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.noteToTuple = exports.tupleToNote = void 0;
const tupleToNote = (tuple) => ({
    pitch: tuple[0],
    time: tuple[1],
    duration: tuple[2],
    velocity: tuple[3],
    muted: tuple[4],
});
exports.tupleToNote = tupleToNote;
const noteToTuple = (note) => [
    note.pitch,
    note.time,
    note.duration,
    note.velocity,
    note.muted,
];
exports.noteToTuple = noteToTuple;
