import { RegisterServiceInput } from '../../types';
import { register } from '../../events';

export const registerService = <T = Record<string, unknown>>(
  input: RegisterServiceInput<T>
): void => {
  const { name: service } = input;

  register<T>(service, input);
};
