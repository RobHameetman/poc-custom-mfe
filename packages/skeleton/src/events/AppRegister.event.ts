import { LoadHook, RouteValidationFn } from '../../types';
import { Events } from '../../enums';
import App from '../App';

export type AppRegisterEventDetail<T = object> = [
  string,
  LoadHook<T>,
  RouteValidationFn,
  T,
];

export default class AppRegisterEvent<T = object> extends CustomEvent<AppRegisterEventDetail<T>> {
  public static readonly type = `skeleton:${Events.APP_REGISTER}`;

  constructor(name: string, loadFn: LoadHook<T>, routeValidFn: RouteValidationFn, customProps: T) {
    super(AppRegisterEvent.type, {
      detail: [ name, loadFn, routeValidFn, customProps ],
    });
  }
}
