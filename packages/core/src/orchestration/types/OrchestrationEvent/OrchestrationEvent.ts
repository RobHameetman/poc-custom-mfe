import { CallHooksEvent, RerouteUrlOnlyEvent, StartEvent, StopEvent } from '../../events';

export type OrchestrationEvent = CallHooksEvent | RerouteUrlOnlyEvent | StartEvent | StopEvent;
