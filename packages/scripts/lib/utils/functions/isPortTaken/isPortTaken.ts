import pf from 'portfinder';

export const isPortTaken = async (port: number): Promise<boolean> => {
  try {
    await pf.getPortPromise({ port, stopPort: port });

    return false;
  } catch {
    return true;
  }
};
