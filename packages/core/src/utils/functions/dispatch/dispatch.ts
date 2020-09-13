import { isInBrowser } from '../../../orchestration';

export const dispatch = <T>(type: string, detail: T): void | never => {
  if (isInBrowser()) {
    document.dispatchEvent(
      new CustomEvent<T>(type, { detail }),
    );
  }
};
