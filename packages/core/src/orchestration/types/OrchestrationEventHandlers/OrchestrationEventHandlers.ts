import { OrchestrationEventHandler } from '../OrchestrationEventHandler';

export interface OrchestrationEventHandlers {
  [key: string]: OrchestrationEventHandler;
}
