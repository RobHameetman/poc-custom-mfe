export type Key = string | number;

export const isKey = (value: unknown): value is Key => {
  return typeof value === 'string' || typeof value === 'number';
};

