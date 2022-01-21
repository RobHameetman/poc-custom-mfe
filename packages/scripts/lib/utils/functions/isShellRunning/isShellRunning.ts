import { isPortTaken } from '../isPortTaken';

export const isShellRunning = async (): Promise<boolean> => {
  return isPortTaken(3000);
};
