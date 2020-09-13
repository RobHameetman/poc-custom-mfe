export const error = (message: string): void => {
  if (__ERROR__) {
    console.error(message);
  }
};
