export const verbose = (message: string): void => {
  if (__VERBOSE__) {
    console.log(message);
  }
};
