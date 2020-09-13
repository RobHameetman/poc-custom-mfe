// import { StartEvent } from '../../events';
import { logEvent } from '../../../utils';

export const handleStart = (e: Record<'type', string>, start: () => void) => {
  logEvent(e);

  start();
};
