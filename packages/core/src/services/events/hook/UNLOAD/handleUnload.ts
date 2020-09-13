import { UnloadEvent } from '../../../events';
import { logEvent } from '../../../../utils';

export const handleUnload = (e: UnloadEvent): void => {
  logEvent(e);

  // TODO
};
