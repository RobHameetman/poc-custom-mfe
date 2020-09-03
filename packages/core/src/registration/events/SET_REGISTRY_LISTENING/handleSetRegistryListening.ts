import { SetRegistryListeningEvent } from '../../events';

export const handleSetRegistryListening = (
  _: SetRegistryListeningEvent,
  setRegistryListening: () => void
): void => {
  setRegistryListening();
};
