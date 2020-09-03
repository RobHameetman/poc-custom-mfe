import { OrchestrationEvents } from '../../enums';
import { Orchestrator } from '../../types';
import { dispatch } from '../../../utils';

export const CALL_HOOKS_SUCCESS = `${Orchestrator.namespace}:${OrchestrationEvents.CALL_HOOKS_SUCCESS}`;
export type CALL_HOOKS_SUCCESS = typeof CALL_HOOKS_SUCCESS;

export interface CallHooksSuccessEvent extends CustomEvent<CallHooksSuccessEventDetail> {
  type: CALL_HOOKS_SUCCESS;
}

export type CallHooksSuccessEventDetail = null;

export const callHooksSuccess = (): void => {
  dispatch(CALL_HOOKS_SUCCESS, null);
};

export const isCallHooksSuccessEvent = (value: unknown): value is CallHooksSuccessEvent => {
  return (
    typeof value === 'object' &&
    value !== null &&
    'type' in value &&
    (value as Partial<CallHooksSuccessEvent>).type === CALL_HOOKS_SUCCESS
  );
};
