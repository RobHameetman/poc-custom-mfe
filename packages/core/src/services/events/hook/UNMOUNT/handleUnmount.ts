import { UnmountEvent } from '../../../events';

export const handleUnmount = (e: UnmountEvent): void => {
  const { resolve } = e.detail;

  resolve();
};
