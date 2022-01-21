import {
  RegisterEventHandler,
  RegistrationErrorEventHandler,
  RegistrationSuccessEventHandler,
  UnregisterEventHandler,
  SetRegistryListeningEventHandler,
} from '../RegistrationEventHandler';
import { RegistrationEvents } from '../../enums';

export interface RegistrationEventHandlers {
  readonly [RegistrationEvents.REGISTER]?: RegisterEventHandler;
  readonly [RegistrationEvents.REGISTRATION_ERROR]?: RegistrationErrorEventHandler;
  readonly [RegistrationEvents.REGISTRATION_SUCCESS]?: RegistrationSuccessEventHandler;
  readonly [RegistrationEvents.UNREGISTER]?: UnregisterEventHandler;
  readonly [RegistrationEvents.SET_REGISTRY_LISTENING]?: SetRegistryListeningEventHandler;
}
