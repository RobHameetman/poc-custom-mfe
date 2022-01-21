import { SetOrchestratorListeningEvent } from '../../events';

export const handleSetOrchestratorListening = (
  e: SetOrchestratorListeningEvent,
  setOrchestratorListening: () => void
): void => {
  setOrchestratorListening();
};
