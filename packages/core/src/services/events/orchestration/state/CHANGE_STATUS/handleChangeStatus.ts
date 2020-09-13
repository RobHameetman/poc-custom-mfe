import { ChangeStatusEvent } from '../../../../events';
import { logEvent } from '../../../../../utils';

export const handleChangeStatus = (e: ChangeStatusEvent): void => {
  logEvent(e);

  // TODO
};
