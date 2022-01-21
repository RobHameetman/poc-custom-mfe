import { logEvent } from '../logEvent';
import { AsyncDetail } from '../../types';
import { isInBrowser } from '../../../orchestration';
import { RejectFn, ResolveFn } from '../../types';

type Resolveable<T> = T & {
  readonly reject: RejectFn,
  readonly resolve: ResolveFn,
}

export const dispatch = <T, U = void>(
  type: string,
  detail: T | null = null,
): Promise<U> => {
  return new Promise<U>((_resolve, _reject) => {
    if (isInBrowser()) {
      const e = new CustomEvent<AsyncDetail<T>>(type, {
        detail: {
          ...(detail ? detail : {}),
          resolve: (detail as Resolveable<T>).resolve || _resolve,
          reject: (detail as Resolveable<T>).reject || _reject,
        } as AsyncDetail<T>,
      });

      logEvent(e);

      document.dispatchEvent(e);
    }
  });
};
