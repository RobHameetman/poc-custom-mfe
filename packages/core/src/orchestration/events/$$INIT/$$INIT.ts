import { handle$$Init } from './handle$$Init';
import { Namespaces, OrchestrationEvents } from '../../enums';
import { AsyncDetail, dispatchOnce } from '../../../utils';

export const $$INIT = `${Namespaces.App}:${OrchestrationEvents.$$INIT}`;
export type $$INIT = typeof $$INIT;

export interface $$InitEvent
  extends CustomEvent<AsyncDetail<$$InitEventDetail>> {
  readonly type: $$INIT;
}

export interface $$InitEventDetail {}

export const $$init = async (): Promise<void> => {
  return dispatchOnce<$$InitEventDetail>(
    $$INIT,
    handle$$Init as EventListenerOrEventListenerObject,
    {},
  );
};

export const is$$InitEvent = (value: unknown): value is $$InitEvent => {
  return (
    typeof value === 'object' &&
    value !== null &&
    'type' in value &&
    (value as Partial<$$InitEvent>).type === $$INIT
  );
};
