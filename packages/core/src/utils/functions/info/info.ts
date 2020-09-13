export const info = (message: string): void => {
  if (__INFO__) {
    console.info(message);
  }
};
