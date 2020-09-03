import { OrchestrationEvent } from '../OrchestrationEvent';

export type OrchestrationEventHandler = (e: OrchestrationEvent) => void;
