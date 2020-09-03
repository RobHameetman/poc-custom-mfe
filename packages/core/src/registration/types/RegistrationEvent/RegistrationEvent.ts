import {
  AddServiceEvent,
  RegisterEvent,
  RegistrationErrorEvent,
  RegistrationSuccessEvent,
  RemoveServiceEvent,
  SetRegistryListeningEvent,
} from '../../events';

export type RegistrationEvent<T = Record<string, unknown>> =
  | AddServiceEvent<T>
  | RegisterEvent
  | RegistrationErrorEvent
  | RegistrationSuccessEvent
  | RemoveServiceEvent
  | SetRegistryListeningEvent;
