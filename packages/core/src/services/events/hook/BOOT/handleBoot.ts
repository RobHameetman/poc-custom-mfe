import { BootEvent } from '../../../events';

export const handleBoot = (e: BootEvent): void => {
  const { resolve } = e.detail;

  resolve();
};
