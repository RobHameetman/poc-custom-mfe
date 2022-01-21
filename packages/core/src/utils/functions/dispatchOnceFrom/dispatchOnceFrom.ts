import { dispatchOnce } from '../dispatchOnce';

export const dispatchOnceFrom = (namespace: string): typeof dispatchOnce => <T>(
  type: string,
  listener: EventListenerOrEventListenerObject,
  detail: T,
): Promise<void> => {
  const eventName = `${namespace}:${type}`;

  return dispatchOnce<T>(eventName, listener, detail);
};
