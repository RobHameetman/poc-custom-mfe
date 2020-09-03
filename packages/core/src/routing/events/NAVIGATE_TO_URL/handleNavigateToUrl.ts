import { NavigateToUrlEvent } from '../../events';

export const handleNavigateToUrl = (e: NavigateToUrlEvent): void => {
  const { detail: url } = e;

  window.location.href = url;
};
