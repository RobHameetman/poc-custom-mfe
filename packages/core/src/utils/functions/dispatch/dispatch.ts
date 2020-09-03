import { isInBrowser } from '../../../orchestration/functions/isInBrowser';

export const dispatch = <T>(type: string, detail: T): void | never => {
  if (isInBrowser()) {
    window.dispatchEvent(new CustomEvent<T>(type, detail));
  }
};
