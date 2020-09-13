import { dispatch } from '../dispatch';

export const dispatchOnce = <T>(
  type: string,
  listener: EventListenerOrEventListenerObject,
  detail: T,
): void | never => {
  document.addEventListener(type, listener);
  dispatch(type, detail);
  setTimeout(() => document.removeEventListener(type, listener), 100);
};
