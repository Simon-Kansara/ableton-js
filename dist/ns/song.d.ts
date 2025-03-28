import { Ableton } from "..";
import { Namespace } from ".";
import { Track, RawTrack } from "./track";
import { CuePoint, RawCuePoint } from "./cue-point";
import { SongView } from "./song-view";
import { Scene, RawScene } from "./scene";
import { RawDevice } from "./device";
import { Device } from "./device";
import { Clip } from "./clip";
export interface AbletonSetScan {
    tempo: number;
    tracks: Track[];
    scenes: Scene[];
    returnTracks: Track[];
    masterTrack: Track;
    devices: Record<string, Device[]>;
    clips: Record<string, Clip[]>;
}
export interface GettableProperties {
    appointed_device: RawDevice;
    arrangement_overdub: boolean;
    back_to_arranger: number;
    can_capture_midi: boolean;
    can_jump_to_next_cue: boolean;
    can_jump_to_prev_cue: boolean;
    can_redo: boolean;
    can_undo: boolean;
    clip_trigger_quantization: Quantization;
    count_in_duration: number;
    cue_points: RawCuePoint[];
    current_song_time: number;
    exclusive_arm: boolean;
    exclusive_solo: boolean;
    groove_amount: number;
    is_counting_in: boolean;
    is_playing: boolean;
    last_event_time: number;
    loop: boolean;
    loop_length: number;
    loop_start: number;
    master_track: RawTrack;
    metronome: number;
    midi_recording_quantization: RecordingQuantization;
    nudge_down: boolean;
    nudge_up: boolean;
    overdub: boolean;
    punch_in: boolean;
    punch_out: boolean;
    re_enable_automation_enabled: number;
    record_mode: number;
    return_tracks: RawTrack[];
    root_note: number;
    scale_name: number;
    scenes: RawScene[];
    select_on_launch: number;
    session_automation_record: number;
    session_record: number;
    session_record_status: number;
    signature_denominator: number;
    signature_numerator: number;
    song_length: number;
    swing_amount: number;
    tempo: number;
    tempo_follower_enabled: boolean;
    tracks: RawTrack[];
    visible_tracks: RawTrack[];
}
export interface TransformedProperties {
    cue_points: CuePoint[];
    master_track: Track;
    return_tracks: Track[];
    tracks: Track[];
    visible_tracks: Track[];
    scenes: Scene[];
}
export interface SettableProperties {
    appointed_device: string;
    arrangement_overdub: boolean;
    back_to_arranger: number;
    clip_trigger_quantization: Quantization;
    count_in_duration: number;
    current_song_time: number;
    exclusive_arm: number;
    exclusive_solo: number;
    groove_amount: number;
    is_counting_in: boolean;
    is_playing: boolean;
    last_event_time: number;
    loop: boolean;
    loop_length: number;
    loop_start: number;
    master_track: number;
    metronome: number;
    midi_recording_quantization: RecordingQuantization;
    nudge_down: boolean;
    nudge_up: boolean;
    overdub: boolean;
    punch_in: boolean;
    punch_out: boolean;
    re_enable_automation_enabled: number;
    record_mode: number;
    return_tracks: number;
    root_note: number;
    scale_name: number;
    select_on_launch: number;
    session_automation_record: number;
    session_record: number;
    session_record_status: number;
    signature_denominator: number;
    signature_numerator: number;
    song_length: number;
    swing_amount: number;
    tempo: number;
    tempo_follower_enabled: boolean;
    visible_tracks: number;
}
export interface ObservableProperties {
    appointed_device: RawDevice;
    arrangement_overdub: boolean;
    back_to_arranger: number;
    can_capture_midi: boolean;
    can_jump_to_next_cue: boolean;
    can_jump_to_prev_cue: boolean;
    clip_trigger_quantization: Quantization;
    count_in_duration: number;
    cue_points: number;
    current_song_time: number;
    data: number;
    exclusive_arm: number;
    groove_amount: number;
    is_counting_in: boolean;
    is_playing: boolean;
    loop_length: number;
    loop: boolean;
    loop_start: number;
    metronome: number;
    midi_recording_quantization: RecordingQuantization;
    nudge_down: boolean;
    nudge_up: boolean;
    overdub: boolean;
    punch_in: boolean;
    punch_out: boolean;
    re_enable_automation_enabled: number;
    record_mode: number;
    return_tracks: RawTrack[];
    scenes: RawScene[];
    session_automation_record: number;
    session_record: number;
    session_record_status: number;
    signature_denominator: number;
    signature_numerator: number;
    song_length: number;
    swing_amount: number;
    tempo: number;
    tempo_follower_enabled: boolean;
    tracks: RawTrack[];
}
export interface SmpteTime {
    hours: number;
    minutes: number;
    seconds: number;
    frames: number;
}
export declare enum TimeFormat {
    MsTime = 0,
    Smpte24 = 1,
    Smpte25 = 2,
    Smpte29 = 3,
    Smpte30 = 4,
    Smpte30Drop = 5
}
export declare enum Quantization {
    q_8_bars = "q_8_bars",
    q_4_bars = "q_4_bars",
    q_2_bars = "q_2_bars",
    q_bar = "q_bar",
    q_half = "q_half",
    q_half_triplet = "q_half_triplet",
    q_quarter = "q_quarter",
    q_quarter_triplet = "q_quarter_triplet",
    q_eight = "q_eight",
    q_eight_triplet = "q_eight_triplet",
    q_sixtenth = "q_sixtenth",
    q_sixtenth_triplet = "q_sixtenth_triplet",
    q_thirtytwoth = "q_thirtytwoth",
    q_no_q = "q_no_q"
}
export declare enum RecordingQuantization {
    rec_q_eight = "rec_q_eight",
    rec_q_eight_eight_triplet = "rec_q_eight_eight_triplet",
    rec_q_eight_triplet = "rec_q_eight_triplet",
    rec_q_no_q = "rec_q_no_q",
    rec_q_quarter = "rec_q_quarter",
    rec_q_sixtenth = "rec_q_sixtenth",
    rec_q_sixtenth_sixtenth_triplet = "rec_q_sixtenth_sixtenth_triplet",
    rec_q_sixtenth_triplet = "rec_q_sixtenth_triplet",
    rec_q_thirtysecond = "rec_q_thirtysecond"
}
export declare class Song extends Namespace<GettableProperties, TransformedProperties, SettableProperties, ObservableProperties> {
    constructor(ableton: Ableton);
    view: SongView;
    beginUndoStep(): Promise<any>;
    continuePlaying(): Promise<any>;
    createAudioTrack(index?: number): Promise<Track>;
    createMidiTrack(index?: number): Promise<Track>;
    createReturnTrack(): Promise<Track>;
    createScene(index?: number): Promise<Scene>;
    deleteReturnTrack(index: number): Promise<any>;
    deleteScene(index: number): Promise<any>;
    deleteTrack(index: number): Promise<any>;
    duplicateScene(index: number): Promise<any>;
    duplicateTrack(index: number): Promise<any>;
    endUndoStep(): Promise<any>;
    getData(key: string): Promise<any>;
    getCurrentSmpteSongTime(timeFormat: TimeFormat): Promise<SmpteTime>;
    isCuePointSelected(): Promise<any>;
    jumpBy(amount: number): Promise<any>;
    jumpToNextCue(): Promise<any>;
    jumpToPrevCue(): Promise<any>;
    playSelection(): Promise<any>;
    redo(): Promise<any>;
    scrubBy(amount: number): Promise<any>;
    setData(key: string, value: any): Promise<any>;
    setOrDeleteCue(): Promise<any>;
    startPlaying(): Promise<any>;
    stopAllClips(): Promise<any>;
    stopPlaying(): Promise<any>;
    /**
     * Only starts playing when Live is currently not playing
     * to prevent Live from jumping back to the start when it's
     * already playing.
     *
     * @returns a boolean indicating whether the command was executed
     */
    safeStartPlaying(): Promise<boolean>;
    /**
     * Only stops playback when Live is currently playing to prevent
     * Live jumping back to the beginning of the arrangement when it's
     * already stopped.
     *
     * @returns a boolean indicating whether the command was executed
     */
    safeStopPlaying(): Promise<boolean>;
    tapTempo(): Promise<any>;
    undo(): Promise<any>;
    scanSet(options?: {
        includeTracks?: boolean;
        includeDevices?: boolean;
        includeClips?: boolean;
        includeScenes?: boolean;
        includeReturnTracks?: boolean;
        includeMasterTrack?: boolean;
    }): Promise<AbletonSetScan>;
}
