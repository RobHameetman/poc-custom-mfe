export const warn = (message: string): void => {
  if (__WARN__) {
    console.warn(message);
  }
};
