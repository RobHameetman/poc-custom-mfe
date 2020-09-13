export type Props<P = Record<string, unknown>> = Readonly<P>;

export const isProps = <P = Record<string, unknown>>(
  value: unknown,
): value is Props<P> => {
  return (
    typeof value === 'object' &&
    value !== null &&
    Object.keys(value).length > 0 &&
    Object.keys(value).every((key) => typeof key === 'string') &&
    Object.keys(value).every(
      (key) => Object.getOwnPropertyDescriptor(value, key)?.writable === false,
    )
  );
};
