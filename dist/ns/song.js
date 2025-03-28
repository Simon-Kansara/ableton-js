"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Song = exports.RecordingQuantization = exports.Quantization = exports.TimeFormat = void 0;
const _1 = require(".");
const track_1 = require("./track");
const cue_point_1 = require("./cue-point");
const song_view_1 = require("./song-view");
const scene_1 = require("./scene");
var TimeFormat;
(function (TimeFormat) {
    TimeFormat[TimeFormat["MsTime"] = 0] = "MsTime";
    TimeFormat[TimeFormat["Smpte24"] = 1] = "Smpte24";
    TimeFormat[TimeFormat["Smpte25"] = 2] = "Smpte25";
    TimeFormat[TimeFormat["Smpte29"] = 3] = "Smpte29";
    TimeFormat[TimeFormat["Smpte30"] = 4] = "Smpte30";
    TimeFormat[TimeFormat["Smpte30Drop"] = 5] = "Smpte30Drop";
})(TimeFormat || (exports.TimeFormat = TimeFormat = {}));
var Quantization;
(function (Quantization) {
    Quantization["q_8_bars"] = "q_8_bars";
    Quantization["q_4_bars"] = "q_4_bars";
    Quantization["q_2_bars"] = "q_2_bars";
    Quantization["q_bar"] = "q_bar";
    Quantization["q_half"] = "q_half";
    Quantization["q_half_triplet"] = "q_half_triplet";
    Quantization["q_quarter"] = "q_quarter";
    Quantization["q_quarter_triplet"] = "q_quarter_triplet";
    Quantization["q_eight"] = "q_eight";
    Quantization["q_eight_triplet"] = "q_eight_triplet";
    Quantization["q_sixtenth"] = "q_sixtenth";
    Quantization["q_sixtenth_triplet"] = "q_sixtenth_triplet";
    Quantization["q_thirtytwoth"] = "q_thirtytwoth";
    Quantization["q_no_q"] = "q_no_q";
})(Quantization || (exports.Quantization = Quantization = {}));
var RecordingQuantization;
(function (RecordingQuantization) {
    RecordingQuantization["rec_q_eight"] = "rec_q_eight";
    RecordingQuantization["rec_q_eight_eight_triplet"] = "rec_q_eight_eight_triplet";
    RecordingQuantization["rec_q_eight_triplet"] = "rec_q_eight_triplet";
    RecordingQuantization["rec_q_no_q"] = "rec_q_no_q";
    RecordingQuantization["rec_q_quarter"] = "rec_q_quarter";
    RecordingQuantization["rec_q_sixtenth"] = "rec_q_sixtenth";
    RecordingQuantization["rec_q_sixtenth_sixtenth_triplet"] = "rec_q_sixtenth_sixtenth_triplet";
    RecordingQuantization["rec_q_sixtenth_triplet"] = "rec_q_sixtenth_triplet";
    RecordingQuantization["rec_q_thirtysecond"] = "rec_q_thirtysecond";
})(RecordingQuantization || (exports.RecordingQuantization = RecordingQuantization = {}));
class Song extends _1.Namespace {
    constructor(ableton) {
        super(ableton, "song");
        this.transformers = {
            cue_points: (points) => points.map((c) => new cue_point_1.CuePoint(ableton, c)),
            master_track: (track) => new track_1.Track(ableton, track),
            return_tracks: (tracks) => tracks.map((t) => new track_1.Track(ableton, t)),
            tracks: (tracks) => tracks.map((t) => new track_1.Track(ableton, t)),
            visible_tracks: (tracks) => tracks.map((t) => new track_1.Track(ableton, t)),
            scenes: (scenes) => scenes.map((s) => new scene_1.Scene(ableton, s)),
        };
        this.cachedProps = {
            cue_points: true,
            master_track: true,
            return_tracks: true,
            tracks: true,
            visible_tracks: true,
            scenes: true,
        };
    }
    view = new song_view_1.SongView(this.ableton);
    async beginUndoStep() {
        return this.sendCommand("begin_undo_step");
    }
    async continuePlaying() {
        return this.sendCommand("continue_playing");
    }
    async createAudioTrack(index = -1) {
        const result = await this.sendCommand("create_audio_track", { index });
        return new track_1.Track(this.ableton, result);
    }
    async createMidiTrack(index = -1) {
        const result = await this.sendCommand("create_midi_track", { index });
        return new track_1.Track(this.ableton, result);
    }
    async createReturnTrack() {
        const result = await this.sendCommand("create_return_track");
        return new track_1.Track(this.ableton, result);
    }
    async createScene(index = -1) {
        const result = await this.sendCommand("create_scene", { index });
        return new scene_1.Scene(this.ableton, result);
    }
    async deleteReturnTrack(index) {
        return this.sendCommand("delete_return_track", [index]);
    }
    async deleteScene(index) {
        return this.sendCommand("delete_scene", [index]);
    }
    async deleteTrack(index) {
        return this.sendCommand("delete_track", [index]);
    }
    async duplicateScene(index) {
        return this.sendCommand("duplicate_scene", [index]);
    }
    async duplicateTrack(index) {
        return this.sendCommand("duplicate_track", [index]);
    }
    async endUndoStep() {
        return this.sendCommand("end_undo_step");
    }
    async getData(key) {
        return this.sendCachedCommand("get_data", { key });
    }
    async getCurrentSmpteSongTime(timeFormat) {
        return this.sendCommand("get_current_smpte_song_time", { timeFormat });
    }
    async isCuePointSelected() {
        return this.sendCommand("is_cue_point_selected");
    }
    async jumpBy(amount) {
        return this.sendCommand("jump_by", [amount]);
    }
    async jumpToNextCue() {
        return this.sendCommand("jump_to_next_cue");
    }
    async jumpToPrevCue() {
        return this.sendCommand("jump_to_prev_cue");
    }
    async playSelection() {
        return this.sendCommand("play_selection");
    }
    async redo() {
        return this.sendCommand("redo");
    }
    async scrubBy(amount) {
        return this.sendCommand("scrub_by", [amount]);
    }
    async setData(key, value) {
        return this.sendCommand("set_data", [key, value]);
    }
    async setOrDeleteCue() {
        return this.sendCommand("set_or_delete_cue");
    }
    async startPlaying() {
        return this.sendCommand("start_playing");
    }
    async stopAllClips() {
        return this.sendCommand("stop_all_clips");
    }
    async stopPlaying() {
        return this.sendCommand("stop_playing");
    }
    /**
     * Only starts playing when Live is currently not playing
     * to prevent Live from jumping back to the start when it's
     * already playing.
     *
     * @returns a boolean indicating whether the command was executed
     */
    async safeStartPlaying() {
        return this.sendCommand("safe_start_playing");
    }
    /**
     * Only stops playback when Live is currently playing to prevent
     * Live jumping back to the beginning of the arrangement when it's
     * already stopped.
     *
     * @returns a boolean indicating whether the command was executed
     */
    async safeStopPlaying() {
        return this.sendCommand("safe_stop_playing");
    }
    async tapTempo() {
        return this.sendCommand("tap_tempo");
    }
    async undo() {
        return this.sendCommand("undo");
    }
    async scanSet(options = {}) {
        // Appliquer les valeurs par défaut
        const opts = {
            includeTracks: true,
            includeDevices: true,
            includeClips: true,
            includeScenes: true,
            includeReturnTracks: true,
            includeMasterTrack: true,
            ...options
        };
        // Structure pour stocker toutes les données du set
        const set = {
            tempo: await this.get("tempo")
        };
        // Récupération des pistes
        if (opts.includeTracks) {
            set.tracks = await this.get("tracks");
        }
        else {
            // Initialiser avec un tableau vide pour éviter les erreurs nullables
            set.tracks = [];
        }
        // Récupération des scènes
        if (opts.includeScenes) {
            set.scenes = await this.get("scenes");
        }
        else {
            set.scenes = [];
        }
        // Récupération des pistes de retour
        if (opts.includeReturnTracks) {
            set.returnTracks = await this.get("return_tracks");
        }
        else {
            set.returnTracks = [];
        }
        // Récupération de la piste master
        if (opts.includeMasterTrack) {
            set.masterTrack = await this.get("master_track");
        }
        // Initialisation des objets pour les périphériques et les clips
        set.devices = {}; // Toujours initialiser même si vide
        set.clips = {}; // Toujours initialiser même si vide
        // Pour chaque piste, récupérer les périphériques et les clips
        if (opts.includeTracks && (opts.includeDevices || opts.includeClips)) {
            for (const track of set.tracks) {
                // Récupération des périphériques
                if (opts.includeDevices) {
                    const devices = await track.get("devices");
                    set.devices[track.raw.id] = devices;
                }
                // Récupération des clips
                // Récupération des clips
                if (opts.includeClips) {
                    const clipSlots = await track.get("clip_slots");
                    // Récupération des clips dans chaque slot
                    for (const clipSlot of clipSlots) {
                        if (await clipSlot.get("has_clip")) {
                            // Récupérer le clip directement, il sera déjà transformé grâce au transformer défini dans ClipSlot
                            const clip = await clipSlot.get("clip");
                            // Vérifier que le clip n'est pas null (par précaution)
                            if (clip) {
                                if (!set.clips[track.raw.id]) {
                                    set.clips[track.raw.id] = [];
                                }
                                set.clips[track.raw.id].push(clip);
                            }
                        }
                    }
                }
            }
        }
        // S'assurer que masterTrack est bien défini
        if (!set.masterTrack && opts.includeMasterTrack) {
            throw new Error("Impossible de récupérer la piste master");
        }
        // Assertion de type pour garantir que toutes les propriétés requises sont présentes
        return set;
    }
}
exports.Song = Song;
