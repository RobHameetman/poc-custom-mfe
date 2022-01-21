import { dispatch } from '../dispatch';

export const dispatchOnce = async <T>(
  type: string,
  listener: EventListenerOrEventListenerObject,
  detail: T,
): Promise<void> => {
  document.addEventListener(type, listener);
  setTimeout(() => document.removeEventListener(type, listener), 100);
  return dispatch<T>(type, detail);
};
