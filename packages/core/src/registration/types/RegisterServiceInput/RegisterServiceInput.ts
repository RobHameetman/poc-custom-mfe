import {
  ImportFn,
} from '../../../services';
import { RouteValidationFn } from '../../../routing/types/RouteValidationFn';

export interface RegisterServiceInput<T = Record<string, unknown>> {
  name: string;
  manifest: string;
  activeWhen: RouteValidationFn;
  customProps?: T;
  importFn?: ImportFn;
}

export const isRegisterServiceInput = <T = Record<string, unknown>>(
  value: unknown
): value is RegisterServiceInput<T> => {
  return (
    typeof value === 'object' &&
    value !== null &&
    'name' in value &&
    'manifest' in value &&
    'activeWhen' in value
  );
};
