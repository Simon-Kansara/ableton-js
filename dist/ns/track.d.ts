import { Ableton } from "..";
import { Namespace } from ".";
import { Device, RawDevice } from "./device";
import { ClipSlot, RawClipSlot } from "./clip-slot";
import { MixerDevice, RawMixerDevice } from "./mixer-device";
import { Clip, RawClip } from "./clip";
import { Color } from "../util/color";
import { TrackView } from "./track-view";
export declare enum RoutingLayout {
    Mono = 1,
    Stereo = 2
}
export interface RoutingChannel {
    display_name: string;
    layout: RoutingLayout;
}
export declare enum RoutingCategory {
    External = 0,
    Rewire = 1,
    Resampling = 2,
    Master = 3,
    Track = 4,
    ParentGroupTrack = 5,
    None = 6,
    Invalid = 7
}
export interface RoutingType {
    display_name: string;
    category: RoutingCategory;
}
export interface GettableProperties {
    arm: boolean;
    arrangement_clips: RawClip[];
    available_input_routing_channels: RoutingChannel[];
    available_input_routing_types: RoutingType[];
    available_output_routing_channels: RoutingChannel[];
    available_output_routing_types: RoutingType[];
    can_be_armed: boolean;
    can_be_frozen: boolean;
    can_show_chains: boolean;
    canonical_parent: number;
    clip_slots: RawClipSlot[];
    color: number;
    color_index: number;
    current_input_routing: string;
    current_input_sub_routing: string;
    current_monitoring_state: number;
    current_output_routing: string;
    current_output_sub_routing: string;
    devices: RawDevice[];
    fired_slot_index: number;
    fold_state: boolean;
    group_track: RawTrack | null;
    has_audio_input: boolean;
    has_audio_output: boolean;
    has_midi_input: boolean;
    has_midi_output: boolean;
    implicit_arm: number;
    input_meter_left: number;
    input_meter_level: number;
    input_meter_right: number;
    is_foldable: boolean;
    is_frozen: boolean;
    is_grouped: boolean;
    is_part_of_selection: boolean;
    is_showing_chains: boolean;
    is_visible: boolean;
    mixer_device: RawMixerDevice;
    mute: boolean;
    muted_via_solo: boolean;
    name: string;
    output_meter_left: number;
    output_meter_level: number;
    output_meter_right: number;
    playing_slot_index: number;
    solo: number;
}
export interface TransformedProperties {
    color: Color;
    devices: Device[];
    clip_slots: ClipSlot[];
    arrangement_clips: Clip[];
    mixer_device: MixerDevice;
}
export interface SettableProperties {
    arm: boolean;
    color: number;
    color_index: number;
    current_input_routing: string;
    current_input_sub_routing: string;
    current_monitoring_state: number;
    current_output_routing: string;
    current_output_sub_routing: string;
    fired_slot_index: number;
    fold_state: number;
    implicit_arm: boolean;
    input_routing_channel: number;
    input_routing_type: number;
    input_routings: number;
    input_sub_routings: number;
    is_showing_chains: number;
    mute: boolean;
    name: string;
    output_routing_channel: number;
    output_routing_type: number;
    output_routings: number;
    output_sub_routings: number;
    playing_slot_index: number;
    solo: boolean;
}
export interface ObservableProperties {
    arm: number;
    arrangement_clips: RawClip[];
    clip_slots: RawClipSlot[];
    color_index: number;
    color: number;
    current_input_routing: string;
    current_input_sub_routing: string;
    current_monitoring_state: number;
    current_output_routing: string;
    current_output_sub_routing: string;
    devices: RawDevice[];
    fired_slot_index: number;
    has_audio_input: boolean;
    has_audio_output: boolean;
    has_midi_input: boolean;
    has_midi_output: boolean;
    implicit_arm: boolean;
    input_meter_left: number;
    input_meter_level: number;
    input_meter_right: number;
    is_frozen: number;
    is_showing_chains: number;
    mute: boolean;
    muted_via_solo: number;
    name: string;
    output_meter_left: number;
    output_meter_level: number;
    output_meter_right: number;
    playing_slot_index: number;
    solo: boolean;
}
export interface RawTrack {
    readonly id: string;
    readonly name: string;
    readonly color: number;
    readonly color_index: number;
    readonly is_foldable: boolean;
    readonly is_grouped: boolean;
    readonly mute: boolean;
    readonly solo: boolean;
}
export declare class Track extends Namespace<GettableProperties, TransformedProperties, SettableProperties, ObservableProperties> {
    raw: RawTrack;
    view: TrackView;
    constructor(ableton: Ableton, raw: RawTrack);
    /**
     * Duplicates the given clip into the arrangement of this track at the provided destination time and returns it.
     * When the type of the clip and the type of the track are incompatible, a runtime error is raised.
     */
    duplicateClipToArrangement(clipOrId: Clip | string, time: number): Promise<any>;
}
