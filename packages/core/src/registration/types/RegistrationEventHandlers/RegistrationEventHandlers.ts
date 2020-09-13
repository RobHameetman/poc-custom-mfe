import {
  AddServiceEventHandler,
  RegistrationErrorEventHandler,
  RegistrationSuccessEventHandler,
  RemoveServiceEventHandler,
  SetRegistryListeningEventHandler,
  RegistrationEventHandler,
} from '../RegistrationEventHandler';
import { RegistrationEvents } from '../../enums';

export interface RegistrationEventHandlers {
  [RegistrationEvents.ADD_SERVICE]: AddServiceEventHandler;
  [RegistrationEvents.REGISTRATION_ERROR]: RegistrationErrorEventHandler;
  [RegistrationEvents.REGISTRATION_SUCCESS]: RegistrationSuccessEventHandler;
  [RegistrationEvents.REMOVE_SERVICE]: RemoveServiceEventHandler;
  [RegistrationEvents.SET_REGISTRY_LISTENING]: SetRegistryListeningEventHandler;
  [key: string]: RegistrationEventHandler;
}
