import { Namespaces, OrchestrationEvents } from '../../enums';
import { AsyncDetail, dispatch } from '../../../utils';

export const ORCHESTRATION_ERROR = `${Namespaces.App}:${OrchestrationEvents.ORCHESTRATION_ERROR}`;
export type ORCHESTRATION_ERROR = typeof ORCHESTRATION_ERROR;

export interface OrchestrationErrorEvent
  extends CustomEvent<AsyncDetail<OrchestrationErrorEventDetail>> {
  readonly type: ORCHESTRATION_ERROR;
}

export interface OrchestrationErrorEventDetail {
  readonly error: Error;
}

export const orchestrationError = async (error: Error): Promise<void> => {
  return dispatch<OrchestrationErrorEventDetail>(ORCHESTRATION_ERROR, { error });
};

export const isOrchestrationErrorEvent = (
  value: unknown,
): value is OrchestrationErrorEvent => {
  return (
    typeof value === 'object' &&
    value !== null &&
    'type' in value &&
    (value as Partial<OrchestrationErrorEvent>).type === ORCHESTRATION_ERROR
  );
};
