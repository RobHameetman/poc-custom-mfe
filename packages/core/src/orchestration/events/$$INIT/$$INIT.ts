import { handle$$Init } from './handle$$Init';
import { Namespaces, OrchestrationEvents } from '../../enums';
import { dispatchOnce } from '../../../utils';

export const $$INIT = `${Namespaces.App}:${OrchestrationEvents.$$INIT}`;
export type $$INIT = typeof $$INIT;

export interface $$InitEvent extends CustomEvent<$$InitEventDetail> {
  type: $$INIT;
}

export interface $$InitEventDetail {
  resolve: typeof Promise.resolve;
}

export const $$init = async (): Promise<void> => {
  return new Promise((resolve) => {
    dispatchOnce(
      $$INIT,
      handle$$Init as EventListenerOrEventListenerObject,
      { resolve },
    );
  });
};

export const is$$InitEvent = (value: unknown): value is $$InitEvent => {
  return (
    typeof value === 'object' &&
    value !== null &&
    'type' in value &&
    (value as Partial<$$InitEvent>).type === $$INIT
  );
};
