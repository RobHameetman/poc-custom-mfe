import { UnloadEvent } from '../../../events';

export const handleUnload = (e: UnloadEvent): void => {
  const { resolve } = e.detail;

  resolve();
};
