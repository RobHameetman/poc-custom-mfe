import { Registry } from '../../types';
import { DispatchFn, dispatchFrom } from '../../../utils';

export const getRegistryDispatch = (): DispatchFn => {
  return dispatchFrom(Registry.namespace);
};
