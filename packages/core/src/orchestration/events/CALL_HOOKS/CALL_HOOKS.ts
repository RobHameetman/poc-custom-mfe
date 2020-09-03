import { OrchestrationEvents } from '../../enums';
import { Orchestrator } from '../../types';
import { dispatch } from '../../../utils';

export const CALL_HOOKS = `${Orchestrator.namespace}:${OrchestrationEvents.CALL_HOOKS}`;
export type CALL_HOOKS = typeof CALL_HOOKS;

export interface CallHooksEvent extends CustomEvent<CallHooksEventDetail> {
  type: CALL_HOOKS;
}

export type CallHooksEventDetail = null;

export const callHooks = (): void => {
  dispatch(CALL_HOOKS, null);
};

export const isCallHooksEvent = (value: unknown): value is CallHooksEvent => {
  return (
    typeof value === 'object' &&
    value !== null &&
    'type' in value &&
    (value as Partial<CallHooksEvent>).type === CALL_HOOKS
  );
};
