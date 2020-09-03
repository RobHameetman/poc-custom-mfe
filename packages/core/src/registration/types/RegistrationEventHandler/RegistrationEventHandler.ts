import { RegistrationEvent } from '../RegistrationEvent';

export type RegistrationEventHandler = <T = Record<string, unknown>>(e: RegistrationEvent<T>) => void;
