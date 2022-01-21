export type Text = string | number;

export const isText = (value: unknown): value is Text => {
  return typeof value === 'string' || typeof value === 'number';
};
