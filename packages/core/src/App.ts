import { Statuses } from '../enums';
import { BootHook, LoadHook, MountHook, RouteValidationFn, UnmountHook } from '../types';

export interface ImportedHooks {
  boot: BootHook | null;
  mount: MountHook | null;
  unmount: UnmountHook | null;
}

export default class App<T = object> {
  private _error: string | null = null;
  private _module: object | null = null;
  private _mountNode: HTMLDivElement | null = null;
  private _running: boolean = false;
  private _status: Statuses = Statuses.REGISTERED;

  private _hooks: ImportedHooks = {
    boot: null,
    mount: null,
    unmount: null,
  };

  public get error(): string | null {
    return this._error;
  }

  public set error(message: string | null) {
    if (this._error && message === null) {
      return;
    }

    this._error = message;
  }

  public get module(): object | null {
    return this._module;
  }

  public set module($module: object | null) {
    if (this._module && $module === null) {
      return;
    }

    this._module = $module;
  }

  public get props(): T {
    return this._customProps;
  }

  public get status(): Statuses {
    return this._status;
  }

  public set status(status: Statuses) {
    this._status = status;
  }

  constructor(
    public namespace: string,
    public load: LoadHook<T>,
    public validateRoute: RouteValidationFn,
    private _customProps: T
  ) {}

  public setHook<H>(name: 'boot' | 'mount' | 'unmount', hook: H | null = null): void {
    if (name && name in this._hooks && !this._hooks[name]) {
      this._hooks[name] = hook as any;
    }
  }

  public async boot(): Promise<void> {
    try {
      ((this._hooks.boot as unknown) as BootHook)();
      this._status = Statuses.BOOTSTRAPPED;
    } catch (err) {
      this._status = Statuses.BOOTSTRAP_ERROR;
      this._error = err;
      console.error(err);
    }
  }

  public async mount(): Promise<HTMLDivElement> {
    return new Promise(
      async (resolve: Function, reject: Function): Promise<HTMLDivElement> => {
        try {
          this._mountNode = await ((this._hooks.mount as unknown) as MountHook)();
          this._status = Statuses.MOUNTED;

          return resolve(this._mountNode);
        } catch (err) {
          this._status = Statuses.MOUNT_ERROR;
          this._error = err;
          console.error(err);

          return reject(err);
        }
      }
    );
  }

  public async unmount(): Promise<void> {
    try {
      ((this._hooks.unmount as unknown) as UnmountHook)();
      this._mountNode = null;
      this._status = Statuses.UNMOUNTED;
    } catch (err) {
      this._status = Statuses.UNMOUNT_ERROR;
      this._error = err;
      console.error(err);
    }
  }

  public unload(): void {
    this._module = null;
  }
}
