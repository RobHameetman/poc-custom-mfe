import { NavigateToUrlEvent } from '../../events';
import { logEvent } from '../../../utils';

export const handleNavigateToUrl = (e: NavigateToUrlEvent): void => {
  logEvent(e);

  const {
    detail: { url },
  } = e;

  window.location.href = url;
};
