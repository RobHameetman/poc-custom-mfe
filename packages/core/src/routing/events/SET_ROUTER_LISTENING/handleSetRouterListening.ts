import { SetRouterListeningEvent } from '../../events';
import { logEvent } from '../../../utils';

export const handleSetRouterListening = (
  e: SetRouterListeningEvent,
  setRouterListening: (value: boolean) => void,
): void => {
  logEvent(e);

  setRouterListening(e.detail.value);
};
