import {
  BootEvent,
  LoadEvent,
  MountEvent,
  UnloadEvent,
  UnmountEvent,
  FetchManifestEvent,
  FetchManifestErrorEvent,
  FetchManifestSuccessEvent,
  ImportEvent,
} from '../../events';

export type ServiceEvent =
  | BootEvent
  | LoadEvent
  | MountEvent
  | UnloadEvent
  | UnmountEvent
  | FetchManifestEvent
  | FetchManifestErrorEvent
  | FetchManifestSuccessEvent
  | ImportEvent;
