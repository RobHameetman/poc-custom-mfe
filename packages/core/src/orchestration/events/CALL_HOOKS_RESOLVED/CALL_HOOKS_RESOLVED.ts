import { Namespaces, OrchestrationEvents } from '../../enums';
import { dispatch } from '../../../utils';

export const CALL_HOOKS_RESOLVED = `${Namespaces.App}:${OrchestrationEvents.CALL_HOOKS_RESOLVED}`;
export type CALL_HOOKS_RESOLVED = typeof CALL_HOOKS_RESOLVED;

export interface CallHooksResolvedEvent
  extends CustomEvent<CallHooksResolvedEventDetail> {
  type: CALL_HOOKS_RESOLVED;
}

export type CallHooksResolvedEventDetail = null;

export const callHooksResolved = (): void => {
  dispatch(CALL_HOOKS_RESOLVED, null);
};

export const isCallHooksResolvedEvent = (
  value: unknown,
): value is CallHooksResolvedEvent => {
  return (
    typeof value === 'object' &&
    value !== null &&
    'type' in value &&
    (value as Partial<CallHooksResolvedEvent>).type === CALL_HOOKS_RESOLVED
  );
};
