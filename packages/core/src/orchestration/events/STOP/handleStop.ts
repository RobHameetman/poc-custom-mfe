// import { StopEvent } from '../../events';
import { logEvent } from '../../../utils';

export const handleStop = (e: Record<'type', string>, stop: () => void) => {
  logEvent(e);

  stop();
};
