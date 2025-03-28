export type NoteTuple = [
    pitch: number,
    time: number,
    duration: number,
    velocity: number,
    muted: boolean
];
export interface Note {
    pitch: number;
    time: number;
    duration: number;
    velocity: number;
    muted: boolean;
}
export declare const tupleToNote: (tuple: NoteTuple) => Note;
export declare const noteToTuple: (note: Note) => NoteTuple;
