import { Handler, Handlers, NamespacedHandlers } from '../../types';

export const addEventListeners = <H extends Handler & EventListener>(
  isListening: boolean,
  namespacedHandlers: NamespacedHandlers,
  onListenersAdded: () => void,
): void => {
  if (!isListening) {
    Object.entries(namespacedHandlers).forEach(([namespace, handlers]: [string, Handlers | undefined]): void =>
        Object.entries(handlers ? handlers : {}).forEach(([type, handler]: [string, H]): void =>
        document.addEventListener(
          `${namespace}:${type}`,
          handler as EventListener,
        ),
      )
    );

    onListenersAdded();
  }
};
