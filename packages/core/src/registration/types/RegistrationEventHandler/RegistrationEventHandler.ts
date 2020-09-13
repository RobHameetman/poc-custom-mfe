import {
  AddServiceEvent,
  RegisterEvent,
  RegistrationErrorEvent,
  RegistrationSuccessEvent,
  RemoveServiceEvent,
  SetRegistryListeningEvent,
} from '../../events';

export type AddServiceEventHandler = (e: AddServiceEvent) => void;
export type RegisterEventHandler = (e: RegisterEvent) => void;
export type RegistrationErrorEventHandler = (e: RegistrationErrorEvent) => void;
export type RegistrationSuccessEventHandler = (
  e: RegistrationSuccessEvent,
) => void;
export type RemoveServiceEventHandler = (e: RemoveServiceEvent) => void;
export type SetRegistryListeningEventHandler = (
  e: SetRegistryListeningEvent,
) => void;

export type RegistrationEventHandler =
  | AddServiceEventHandler
  | RegisterEventHandler
  | RegistrationErrorEventHandler
  | RegistrationSuccessEventHandler
  | RemoveServiceEventHandler
  | SetRegistryListeningEventHandler;
