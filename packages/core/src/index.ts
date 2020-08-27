import {
  AnyImportedHook,
  BootHook,
  LoadHook,
  MountHook,
  RouteValidationFn,
  UnmountHook,
} from '../types';
import { Statuses } from '../enums';
import Registry from './Registry';
import App from './App';
import { AppRegisterEvent } from './events';

let started = false;
let changing = false;
let changeQueue = [];

Registry.init();

export const registerApplication = <T = object>(
  name: string,
  loadFn: LoadHook<T>,
  routeValidFn: RouteValidationFn,
  customProps?: T
): void => {
  document.dispatchEvent(
    new AppRegisterEvent(name, loadFn, routeValidFn, customProps || ({} as T))
  );
};

export const start = (): void => {
  started = true;
};

export const isStarted = (): boolean => {
  return started;
};

const createEvent = (eventArguments: Array<unknown>): CustomEvent<string> | undefined => {
  let result: CustomEvent['detail'] = { detail: {} };

  if (Array.isArray(eventArguments) && eventArguments[0]) {
    result.detail.originalEvent = eventArguments[0];
  }

  return result;
};

export const change = (eventArgs: Array<unknown>) => {
  if (changing) {
    return new Promise((resolve, reject) => {
      changeQueue.push({
        resolve,
        reject,
        eventArgs,
      });
    });
  }

  const implementChanges = () => {
    return new Promise(async (resolve: Function, reject: Function) => {
      window.dispatchEvent(new CustomEvent('core:before-change', createEvent(eventArgs)));
    });
  };

  const validateLifecycleHook = <H = AnyImportedHook>(hook: unknown): hook is H => {
    return (
      hook &&
      (typeof hook === 'function' ||
        (Array.isArray(hook) && hook.every((fn) => typeof fn === 'function')))
    );
  };

  const load = async <T = object>(app: App<T>): Promise<App<T>> => {
    return new Promise<App<T>>(
      async (resolve: Function): Promise<App<T>> => {
        let $app: App<T>;
        let errMsg: string = '';

        try {
          $app = await app.load(app.props);

          if (typeof $app !== 'object') {
            errMsg = 'The imported asset is not a module.';
          }

          if (!validateLifecycleHook<BootHook>($app.boot)) {
            errMsg = 'The imported module does not export a valid `bootstrap()` function.';
          }

          if (!validateLifecycleHook<MountHook>($app.mount)) {
            errMsg = 'The imported module does not export a valid `mount()` function.';
          }

          if (!validateLifecycleHook<UnmountHook>($app.unmount)) {
            errMsg = 'The imported module does not export a valid `unmount()` function.';
          }

          if (errMsg) {
            throw new Error(errMsg);
          }

          app.status = Statuses.LOADED;

          app.setHook('boot', $app.boot);
          app.setHook('mount', $app.mount);
          app.setHook('unmount', $app.unmount);

          app.module = $app;
        } catch (err) {
          app.status = Statuses.LOAD_ERROR;
          app.error = err;
        }

        return resolve(app);
      }
    );
  };

  const loadApps = async <T = object>() => {
    const promiseQueue = ((apps as unknown) as Array<App<T>>).map(
      (app: App<T>): Promise<App<T>> => {
        return new Promise(
          async (resolve: Function): Promise<App<T>> => {
            if (app.status !== Statuses.REGISTERED && app.status !== Statuses.LOAD_ERROR) {
              return resolve(app);
            }

            return resolve(await load(app));
          }
        );
      }
    );

    await Promise.all(promiseQueue);
  };

  changing = true;

  return isStarted() ? implementChanges() : loadApps();
};
