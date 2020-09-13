import { SetOrchestratorListeningEvent } from '../../events';
import { logEvent } from '../../../utils';

export const handleSetOrchestratorListening = (
  e: SetOrchestratorListeningEvent,
  setOrchestratorListening: () => void
): void => {
  logEvent(e);

  setOrchestratorListening();
};
