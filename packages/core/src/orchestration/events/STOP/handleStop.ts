import { StopEvent } from '../../events';

export const handleStop = (_: StopEvent, stop: () => void) => {
  stop();
};
