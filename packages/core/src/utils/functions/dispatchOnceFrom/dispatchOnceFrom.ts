import { dispatch } from '../dispatch';
import { DispatchOnceFn } from '../../types';

export const dispatchOnceFrom = (namespace: string): DispatchOnceFn => <T>(
  type: string,
  listener: EventListenerOrEventListenerObject,
  detail: T
): void | never => {
  const eventName = `${namespace}:${type}`;

  document.addEventListener(eventName, listener, { once: true });
  dispatch(`${namespace}:${type}`, detail);
};
