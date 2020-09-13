import { dispatchFrom } from '../dispatchFrom';
import { Handler, Handlers, SET_LISTENING } from '../../types';

export const addEventListeners = <H extends Handler & EventListener>(
  isListening: boolean,
  handlers: Handlers,
  namespace: string,
  SET_LISTENING: SET_LISTENING
): void => {
  if (!isListening) {
    Object.entries(handlers).forEach(([type, handler]: [string, H]): void =>
      document.addEventListener(`${namespace}:${type}`, handler as EventListener)
    );

    const dispatch = dispatchFrom(namespace);

    dispatch(SET_LISTENING, { value: true });
  }
};
