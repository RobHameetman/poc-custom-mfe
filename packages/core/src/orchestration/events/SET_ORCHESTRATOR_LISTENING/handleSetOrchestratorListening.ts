import { SetOrchestratorListeningEvent } from '../../events';

export const handleSetOrchestratorListening = (
  _: SetOrchestratorListeningEvent,
  setOrchestratorListening: () => void
): void => {
  setOrchestratorListening();
};
