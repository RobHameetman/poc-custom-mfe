import { Registry } from '../../types';
import { dispatchFrom } from '../../../utils';

export const getRegistryDispatch = (): ReturnType<typeof dispatchFrom> => {
  return dispatchFrom(Registry.namespace);
};
