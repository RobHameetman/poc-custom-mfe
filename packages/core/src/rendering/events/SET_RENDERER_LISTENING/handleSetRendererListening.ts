import { SetRendererListeningEvent } from './SET_RENDERER_LISTENING';
import { logEvent, verbose } from '../../../utils';

export const handleSetRendererListening = async (
  e: SetRendererListeningEvent,
  setRendererListening: (value: boolean) => void,
): Promise<void> => {
  logEvent(e);

  if (__DEV__) {
    verbose('handleSetRendererListening()');
  }

  setRendererListening(e.detail.value);
};
