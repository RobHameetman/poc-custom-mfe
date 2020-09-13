import { Namespaces, OrchestrationEvents } from '../../enums';
import { dispatch } from '../../../utils';

export const CALL_HOOKS_ERROR = `${Namespaces.App}:${OrchestrationEvents.CALL_HOOKS_ERROR}`;
export type CALL_HOOKS_ERROR = typeof CALL_HOOKS_ERROR;

export interface CallHooksErrorEvent
  extends CustomEvent<CallHooksErrorEventDetail> {
  type: CALL_HOOKS_ERROR;
}

export type CallHooksErrorEventDetail = null;

export const callHooksError = (): void => {
  dispatch(CALL_HOOKS_ERROR, null);
};

export const isCallHooksErrorEvent = (
  value: unknown,
): value is CallHooksErrorEvent => {
  return (
    typeof value === 'object' &&
    value !== null &&
    'type' in value &&
    (value as Partial<CallHooksErrorEvent>).type === CALL_HOOKS_ERROR
  );
};
