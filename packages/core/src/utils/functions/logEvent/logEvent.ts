interface HasType {
  type: string;
}

export const logEvent = (e: HasType) => {
  if (__EVENTS__ === undefined && __DEV__) {
    __EVENTS__ = [];
  }

  __EVENTS__.push(e);
};
