import { Namespaces, OrchestrationEvents } from '../../enums';
import { dispatch } from '../../../utils';

export const STOP = `${Namespaces.App}:${OrchestrationEvents.STOP}`;
export type STOP = typeof STOP;

export interface StopEvent extends CustomEvent<StopEventDetail> {
  type: STOP;
}

export type StopEventDetail = null;

export const stop = () => {
  dispatch(STOP, null);
};

export const isStopEvent = (value: unknown): value is StopEvent => {
  return (
    typeof value === 'object' &&
    value !== null &&
    'type' in value &&
    (value as Partial<StopEvent>).type === STOP
  );
};
