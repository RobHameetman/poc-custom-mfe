import { Events, Statuses } from '../enums';
import { AppChangeStatusEvent, AppRegisterEvent } from './events';
import App from './App';

export type RegistryEvent<T = object> = AppRegisterEvent<T>;

export interface RegistryEventHandler extends EventListener {
  <E extends RegistryEvent>(e: E): void;
}

export interface RegistryEvents {
  [key: string]: RegistryEventHandler;
};

export default class Registry {
  private static _apps: Array<App> = [];
  private static _listening: boolean = false;

  private static _events: RegistryEvents = {
    [Events.APP_CHANGE_STATUS]: <E extends AppChangeStatusEvent>(e: E): void => Registry._changeStatus(...e.detail),
    [Events.APP_REGISTER]: <E extends AppRegisterEvent<T>, T = object>(e: E): void => Registry._register(new App<T>(...e.detail)),
  };

  public static find(callback: (app: App, index: number, arr: Array<App>) => boolean): App | undefined {
    return this._apps.find(callback);
  }

  public static forEach(callback: (app: App, index: number, arr: Array<App>) => void): void {
    this._apps.forEach(callback)
  }

  public static asyncMap<U>(callback: (app: App, index: number, arr: Array<App>) => Promise<U>): Array<Promise<U>> {
    return this._apps.map<Promise<U>>(callback)
  }

  public static map<U>(callback: (app: App, index: number, arr: Array<App>) => U): Array<U> {
    return this._apps.map<U>(callback)
  }

  public static init(): void {
    this._addEventListeners();
  }

  private static _changeStatus(appName: string, status: Statuses): void {
    const app = this.find($app => $app.namespace === appName);

    if (app && app.status !== status) {
      app.status = status;
    }
  }

  private static _register<T = object>(app: App<T>): void {
    this._apps.push(app as unknown as App);
  }

  private static _addEventListeners(): void {
    if (!this._listening) {
      Object.entries(this._events).forEach(
        ([ type, handler ]: [ string, RegistryEventHandler ]): void =>
          document.addEventListener(`skeleton:${type}`, handler)
      );
    }

    this._listening = true;
  }
}
