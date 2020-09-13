export const debug = (message: string): void => {
  if (__DEBUG__) {
    console.debug(message);
  }
};
