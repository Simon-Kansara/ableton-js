import { Ableton } from "..";
import { Namespace } from ".";
import { Device, RawDevice } from "./device";
import { Track, RawTrack } from "./track";
import { Scene, RawScene } from "./scene";
import { RawDeviceParameter, DeviceParameter } from "./device-parameter";
import { ClipSlot, RawClipSlot } from "./clip-slot";

export enum DeviceInsertMode {
  Default = "default",
  Left = "left",
  Right = "right",
}

export interface GettableProperties {
  // device_insert_mode: DeviceInsertMode; – for some reason, Live returns a boolean here
  is_collapsed: boolean;
  selected_device: RawDevice;
}

export interface TransformedProperties {
  selected_device: Device;
}

export interface SettableProperties {
  device_insert_mode: DeviceInsertMode;
  is_collapsed: boolean;
}

export interface ObservableProperties {
  // device_insert_mode: DeviceInsertMode;
  is_collapsed: boolean;
  selected_device: RawDevice;
}

export class TrackView extends Namespace<
  GettableProperties,
  TransformedProperties,
  SettableProperties,
  ObservableProperties
> {
  constructor(ableton: Ableton, nsid: string) {
    super(ableton, "track-view", nsid);

    this.transformers = {
      selected_device: (device) => new Device(ableton, device),
    };

    this.cachedProps = {
      selected_device: true,
    };
  }

  /**
   * Selects the track's instrument if it has one.
   */
  async selectInstrument() {
    return this.sendCommand("select_instrument");
  }
}
