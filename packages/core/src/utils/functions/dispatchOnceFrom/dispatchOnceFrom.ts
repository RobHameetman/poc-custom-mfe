import { dispatchOnce } from '../dispatchOnce';
import { DispatchOnceFn } from '../../types';

export const dispatchOnceFrom = (namespace: string): DispatchOnceFn => <T>(
  type: string,
  listener: EventListenerOrEventListenerObject,
  detail: T,
): void | never => {
  const eventName = `${namespace}:${type}`;

  dispatchOnce(eventName, listener, detail);
};
