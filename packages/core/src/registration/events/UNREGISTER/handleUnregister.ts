import { UnregisterEvent } from '..';
import { AppFrameElement } from '../../../services';

export const handleUnregister = (e: UnregisterEvent, onUnregister: (frame: AppFrameElement) => void): void => {
  const { frame, resolve } = e.detail;

  onUnregister(frame);
  resolve();
};
