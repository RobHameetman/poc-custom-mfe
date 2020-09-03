import PrettyError from 'pretty-error';

export const formatError = (err: Error): void => {
  const formatter = new PrettyError();

  console.log(formatter.render(err));
};
