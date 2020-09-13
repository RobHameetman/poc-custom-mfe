import { SetRegistryListeningEvent } from '../../events';
import { logEvent } from '../../../utils';

export const handleSetRegistryListening = (
  e: SetRegistryListeningEvent,
  setRegistryListening: (value: boolean) => void,
): void => {
  logEvent(e);

  setRegistryListening(e.detail.value);
};
