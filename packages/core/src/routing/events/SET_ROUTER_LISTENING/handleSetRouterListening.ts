import { SetRouterListeningEvent } from '../../events';

export const handleSetRouterListening = (
  e: SetRouterListeningEvent,
  setRouterListening: (value: boolean) => void,
): void => {
  setRouterListening(e.detail.value);
};
