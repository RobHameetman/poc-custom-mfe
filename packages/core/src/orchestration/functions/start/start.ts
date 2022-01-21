import { $$init } from '../../events';

export const start = async (): Promise<void> => {
  return new Promise(async (resolve) => {
    await $$init();

    return resolve();
  });
};
