import {
  RegisterEvent,
  RegistrationErrorEvent,
  RegistrationSuccessEvent,
  UnregisterEvent,
  SetRegistryListeningEvent,
} from '../../events';

export type RegisterEventHandler = (e: RegisterEvent) => void;
export type RegistrationErrorEventHandler = (e: RegistrationErrorEvent) => void;
export type RegistrationSuccessEventHandler = (
  e: RegistrationSuccessEvent,
) => void;
export type UnregisterEventHandler = (e: UnregisterEvent) => void;
export type SetRegistryListeningEventHandler = (
  e: SetRegistryListeningEvent,
) => void;

export type RegistrationEventHandler =
  | RegisterEventHandler
  | RegistrationErrorEventHandler
  | RegistrationSuccessEventHandler
  | UnregisterEventHandler
  | SetRegistryListeningEventHandler;
