import { MountEvent } from '../../../events';

export const handleMount = (e: MountEvent): void => {
  const { resolve } = e.detail;

  resolve();
};
