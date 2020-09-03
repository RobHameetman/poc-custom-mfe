export const isNotSpreadable = (value: unknown): boolean =>
  Array.isArray(value) || typeof value !== 'object';
