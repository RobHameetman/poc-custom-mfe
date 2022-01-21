import { SetRegistryListeningEvent } from '../../events';

export const handleSetRegistryListening = (
  e: SetRegistryListeningEvent,
  setRegistryListening: (value: boolean) => void,
): void => {
  setRegistryListening(e.detail.value);
};
