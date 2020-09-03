import { ServiceEventHandler } from '../ServiceEventHandler';

export interface ServiceEventHandlers {
  [key: string]: ServiceEventHandler;
}
