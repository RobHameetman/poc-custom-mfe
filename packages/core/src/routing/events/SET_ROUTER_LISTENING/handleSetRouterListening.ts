import { SetRouterListeningEvent } from '../../events';

export const handleSetRouterListening = (
  _: SetRouterListeningEvent,
  setRouterListening: () => void
): void => {
  setRouterListening();
};
