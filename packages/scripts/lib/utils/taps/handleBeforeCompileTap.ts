export const handleBeforeCompileTap = (): void => {
  let tsMessagesResolver: (msgs: unknown) => void;

  const tsMessagesPromise = new Promise((resolve) => {
    tsMessagesResolver = (msgs: unknown) => resolve(msgs);
  });

  tsMessagesPromise.then(() => {
    return tsMessagesResolver;
  });
};
