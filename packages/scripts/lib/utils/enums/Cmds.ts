export enum Cmds {
  build,
  dev,
  start,
  test,
}

export type Cmd = keyof typeof Cmds;

export const isCmd = (value: unknown): value is Cmd => {
  return (
    typeof value === 'string' &&
    value.length > 0 &&
    Object.keys(Cmds)
      .filter((key) => typeof key === 'number')
      .includes(value)
  );
};
