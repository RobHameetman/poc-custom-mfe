import { Manifest } from '../Manifest';
import { ImportChunkFn } from '../ImportChunkFn';
import { ImportStylesheetFn } from '../ImportStylesheetFn';
import { ImportEntrypointFn } from '../ImportEntrypointFn';
import { ImportManifestFn } from '../ImportManifestFn';
import { ServiceEvent } from '../ServiceEvent';
import { ServiceEventHandlers } from '../ServiceEventHandlers';
import {
  ServiceHookEvents,
  ServiceOrchestrationEvents,
  ServiceStatuses,
} from '../../enums';
import {
  handleBoot,
  handleLoad,
  handleMount,
  handleUnload,
  handleUnmount,
  handleImportChunk,
  handleImportChunkError,
  handleImportChunkSuccess,
  handleImportEntrypoint,
  handleImportEntrypointError,
  handleImportEntrypointSuccess,
  handleImportManifest,
  handleImportManifestError,
  handleImportManifestSuccess,
  handleImportStylesheet,
  handleImportStylesheetError,
  handleImportStylesheetSuccess,
  handleChangeStatus,
  isBootEvent,
  isLoadEvent,
  isMountEvent,
  isUnloadEvent,
  isUnmountEvent,
  isImportChunkEvent,
  isImportChunkErrorEvent,
  isImportChunkSuccessEvent,
  isImportEntrypointEvent,
  isImportEntrypointErrorEvent,
  isImportEntrypointSuccessEvent,
  isImportManifestEvent,
  isImportManifestErrorEvent,
  isImportManifestSuccessEvent,
  isImportStylesheetEvent,
  isImportStylesheetErrorEvent,
  isImportStylesheetSuccessEvent,
  isChangeStatusEvent,
} from '../../events';
import {
  defaultImportStylesheet,
  defaultImportChunk,
  defaultImportEntrypoint,
  defaultImportManifest,
} from '../../functions';
import {
  BootHook,
  ImportedHooks,
  MountHook,
  UnmountHook,
} from '../../../orchestration';
import { RouteValidationFn } from '../../../routing';
import { addEventListeners, dispatchFrom } from '../../../utils';

export class Service<T = Record<string, unknown>> {
  public loadErrorTime = 0;

  private _error: string | null = null;
  private _listening = false;
  private _manifest: Manifest | null = null;
  private _module: Record<string, unknown> | null = null;
  private _mountNode: HTMLDivElement | null = null;
  // private _running = false;
  private _status: ServiceStatuses = ServiceStatuses.REGISTERED;

  private _handlers: ServiceEventHandlers = {
    [ServiceHookEvents.BOOT]: (e) => this._handleBoot(e),
    [ServiceHookEvents.LOAD]: (e) => this._handleLoad(e),
    [ServiceHookEvents.MOUNT]: (e) => this._handleMount(e),
    [ServiceHookEvents.UNLOAD]: (e) => this._handleUnload(e),
    [ServiceHookEvents.UNMOUNT]: (e) => this._handleUnmount(e),
    [ServiceOrchestrationEvents.IMPORT_CHUNK]: (e) =>
      this._handleImportChunk(e),
    [ServiceOrchestrationEvents.IMPORT_CHUNK_ERROR]: (e) =>
      this._handleImportChunkError(e),
    [ServiceOrchestrationEvents.IMPORT_CHUNK_SUCCESS]: (e) =>
      this._handleImportChunkSuccess(e),
    [ServiceOrchestrationEvents.IMPORT_ENTRYPOINT]: (e) =>
      this._handleImportEntrypoint(e),
    [ServiceOrchestrationEvents.IMPORT_ENTRYPOINT_ERROR]: (e) =>
      this._handleImportEntrypointError(e),
    [ServiceOrchestrationEvents.IMPORT_ENTRYPOINT_SUCCESS]: (e) =>
      this._handleImportEntrypointSuccess(e),
    [ServiceOrchestrationEvents.IMPORT_MANIFEST]: (e) =>
      this._handleImportManifest(e),
    [ServiceOrchestrationEvents.IMPORT_MANIFEST_ERROR]: (e) =>
      this._handleImportManifestError(e),
    [ServiceOrchestrationEvents.IMPORT_MANIFEST_SUCCESS]: (e) =>
      this._handleImportManifestSuccess(e),
    [ServiceOrchestrationEvents.IMPORT_STYLESHEET]: (e) =>
      this._handleImportStylesheet(e),
    [ServiceOrchestrationEvents.IMPORT_STYLESHEET_ERROR]: (e) =>
      this._handleImportStylesheetError(e),
    [ServiceOrchestrationEvents.IMPORT_STYLESHEET_SUCCESS]: (e) =>
      this._handleImportStylesheetSuccess(e),
    [ServiceOrchestrationEvents.CHANGE_STATUS]: (e) =>
      this._handleChangeStatus(e),
  };

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

  public get module(): Record<string, unknown> | null {
    return this._module;
  }

  public set module($module: Record<string, unknown> | null) {
    if (this._module && $module === null) {
      return;
    }

    this._module = $module;
  }

  public get props(): T | undefined {
    return this._customProps;
  }

  public get status(): ServiceStatuses {
    return this._status;
  }

  public set status(status: ServiceStatuses) {
    this._status = status;
  }

  constructor(
    public readonly name: string,
    public readonly manifestEndpoint: string,
    public activeWhen: RouteValidationFn,
    public importChunk: ImportChunkFn = defaultImportChunk,
    public importEntrypoint: ImportEntrypointFn = defaultImportEntrypoint,
    public importManifest: ImportManifestFn = defaultImportManifest,
    public importStylesheet: ImportStylesheetFn = defaultImportStylesheet,
    private _customProps?: T,
  ) {
    this._addEventListeners();
  }

  public setHook<H>(
    name: 'boot' | 'mount' | 'unmount',
    hook: H | null = null,
  ): void {
    if (name && name in this._hooks && !this._hooks[name]) {
      this._hooks[name] = hook as any;
    }
  }

  public async boot(): Promise<void> {
    try {
      ((this._hooks.boot as unknown) as BootHook)();
      this._status = ServiceStatuses.BOOTSTRAPPED;
    } catch (err) {
      this._status = ServiceStatuses.BOOTSTRAP_ERROR;
      this._error = err;

      console.error(err);
    }
  }

  public async mount(): Promise<HTMLDivElement> {
    return new Promise(
      async (resolve: Function, reject: Function): Promise<HTMLDivElement> => {
        try {
          this._mountNode = await ((this._hooks
            .mount as unknown) as MountHook)();
          this._status = ServiceStatuses.MOUNTED;

          return resolve(this._mountNode);
        } catch (err) {
          this._status = ServiceStatuses.MOUNT_ERROR;
          this._error = err;
          console.error(err);

          return reject(err);
        }
      },
    );
  }

  public async unmount(): Promise<void> {
    try {
      ((this._hooks.unmount as unknown) as UnmountHook)();
      this._mountNode = null;
      this._status = ServiceStatuses.UNMOUNTED;
    } catch (err) {
      this._status = ServiceStatuses.UNMOUNT_ERROR;
      this._error = err;
      console.error(err);
    }
  }

  public unload(): void {
    this._module = null;
  }

  private _addEventListeners(): void {
    addEventListeners(
      this._listening,
      this._handlers,
      this.name,
      ServiceOrchestrationEvents.SET_SERVICE_LISTENING,
    );
  }

  private _dispatch = <T>(type: string, detail: T): void => {
    const dispatch = dispatchFrom(this.name);

    dispatch<T>(type, detail);
  };

  private _handleBoot(e: ServiceEvent): void {
    if (isBootEvent(e)) {
      handleBoot(e);
    }
  }

  private _handleLoad(e: ServiceEvent): void {
    if (isLoadEvent(e)) {
      handleLoad(e);
    }
  }

  private _handleMount(e: ServiceEvent): void {
    if (isMountEvent(e)) {
      handleMount(e);
    }
  }

  private _handleUnload(e: ServiceEvent): void {
    if (isUnloadEvent(e)) {
      handleUnload(e);
    }
  }

  private _handleUnmount(e: ServiceEvent): void {
    if (isUnmountEvent(e)) {
      handleUnmount(e);
    }
  }

  private async _handleImportChunk(e: ServiceEvent): Promise<void> {
    if (isImportChunkEvent(e)) {
      try {
        const chunk = await this.importChunk(e.detail);

        this._dispatch(ServiceOrchestrationEvents.IMPORT_CHUNK_SUCCESS, chunk);
      } catch (err) {
        this._dispatch(ServiceOrchestrationEvents.IMPORT_CHUNK_ERROR, err);
      }

      handleImportChunk(e);
    }
  }

  private _handleImportChunkError(e: ServiceEvent): void {
    if (isImportChunkErrorEvent(e)) {
      handleImportChunkError(e);
    }
  }

  private _handleImportChunkSuccess(e: ServiceEvent): void {
    if (isImportChunkSuccessEvent(e)) {
      handleImportChunkSuccess(e);
    }
  }

  private async _handleImportEntrypoint(e: ServiceEvent): Promise<void> {
    if (isImportEntrypointEvent(e)) {
      try {
        this._module = await this.importEntrypoint(e.detail);

        this._dispatch(
          ServiceOrchestrationEvents.IMPORT_ENTRYPOINT_SUCCESS,
          this._module,
        );
      } catch (err) {
        this._dispatch(ServiceOrchestrationEvents.IMPORT_ENTRYPOINT_ERROR, err);
      }

      handleImportEntrypoint(e);
    }
  }

  private _handleImportEntrypointError(e: ServiceEvent): void {
    if (isImportEntrypointErrorEvent(e)) {
      handleImportEntrypointError(e);
    }
  }

  private _handleImportEntrypointSuccess(e: ServiceEvent): void {
    if (isImportEntrypointSuccessEvent(e)) {
      handleImportEntrypointSuccess(e);
    }
  }

  private async _handleImportManifest(e: ServiceEvent): Promise<void> {
    if (isImportManifestEvent(e)) {
      try {
        this._manifest = await this.importManifest(this.manifestEndpoint);

        this._dispatch(
          ServiceOrchestrationEvents.IMPORT_MANIFEST_SUCCESS,
          this._manifest,
        );
      } catch (err) {
        this._dispatch(ServiceOrchestrationEvents.IMPORT_MANIFEST_ERROR, err);
      }

      handleImportManifest(e);
    }
  }

  private _handleImportManifestError(e: ServiceEvent): void {
    if (isImportManifestErrorEvent(e)) {
      handleImportManifestError(e);
    }
  }

  private _handleImportManifestSuccess(e: ServiceEvent): void {
    if (isImportManifestSuccessEvent(e)) {
      handleImportManifestSuccess(e);
    }
  }

  private async _handleImportStylesheet(e: ServiceEvent): Promise<void> {
    if (isImportStylesheetEvent(e)) {
      try {
        const stylesheet = await this.importStylesheet(e.detail);

        this._dispatch(
          ServiceOrchestrationEvents.IMPORT_STYLESHEET_SUCCESS,
          stylesheet,
        );
      } catch (err) {
        this._dispatch(ServiceOrchestrationEvents.IMPORT_STYLESHEET_ERROR, err);
      }

      handleImportStylesheet(e);
    }
  }

  private _handleImportStylesheetError(e: ServiceEvent): void {
    if (isImportStylesheetErrorEvent(e)) {
      handleImportStylesheetError(e);
    }
  }

  private _handleImportStylesheetSuccess(e: ServiceEvent): void {
    if (isImportStylesheetSuccessEvent(e)) {
      handleImportStylesheetSuccess(e);
    }
  }

  private _handleChangeStatus(e: ServiceEvent): void {
    if (isChangeStatusEvent(e)) {
      handleChangeStatus(e);
    }
  }
}
