import { StartEvent } from '../../events';

export const handleStart = (_: StartEvent, start: () => void) => {
  start();
};
