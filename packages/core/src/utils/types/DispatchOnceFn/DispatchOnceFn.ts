export type DispatchOnceFn = <T>(
  type: string,
  listener: EventListenerOrEventListenerObject,
  detail: T
) => void | never;
