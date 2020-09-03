import { RegistrationEventHandler } from '../RegistrationEventHandler';

export interface RegistrationEventHandlers {
  [key: string]: RegistrationEventHandler;
}
