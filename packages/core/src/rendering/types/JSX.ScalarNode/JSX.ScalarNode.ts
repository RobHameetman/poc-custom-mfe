import { Text, isText } from '../JSX.Text';

export type ScalarNode = Text | boolean;

export const isScalarNode = (value: unknown): value is ScalarNode => {
  return (
    isText(value) ||
    typeof value === 'boolean'
  );
};
