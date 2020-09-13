import { UnmountEvent } from '../../../events';
import { logEvent } from '../../../../utils';

export const handleUnmount = (e: UnmountEvent): void => {
  logEvent(e);

  // TODO
};
