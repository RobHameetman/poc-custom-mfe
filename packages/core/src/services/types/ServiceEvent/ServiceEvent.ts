import {
  BootEvent,
  LoadEvent,
  MountEvent,
  UnloadEvent,
  UnmountEvent,
  ImportChunkEvent,
  ImportChunkErrorEvent,
  ImportChunkSuccessEvent,
  ImportEntrypointEvent,
  ImportEntrypointErrorEvent,
  ImportEntrypointSuccessEvent,
  ImportManifestEvent,
  ImportManifestErrorEvent,
  ImportManifestSuccessEvent,
  ImportStylesheetEvent,
  ImportStylesheetErrorEvent,
  ImportStylesheetSuccessEvent,
  ChangeStatusEvent,
} from '../../events';

export type ServiceEvent =
  | BootEvent
  | LoadEvent
  | MountEvent
  | UnloadEvent
  | UnmountEvent
  | ImportChunkEvent
  | ImportChunkErrorEvent
  | ImportChunkSuccessEvent
  | ImportEntrypointEvent
  | ImportEntrypointErrorEvent
  | ImportEntrypointSuccessEvent
  | ImportManifestEvent
  | ImportManifestErrorEvent
  | ImportManifestSuccessEvent
  | ImportStylesheetEvent
  | ImportStylesheetErrorEvent
  | ImportStylesheetSuccessEvent
  | ChangeStatusEvent;
