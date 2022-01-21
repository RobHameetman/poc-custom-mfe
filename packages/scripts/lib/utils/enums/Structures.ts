export enum Structures {
  app,
  core,
  service,
}

export type Structure = keyof typeof Structures;

export const isStructure = (value: unknown): value is Structure => {
  return (
    typeof value === 'string' &&
    value.length > 0 &&
    Object.keys(Structures)
      .filter((key) => typeof key !== 'number')
      .includes(value)
  );
};
