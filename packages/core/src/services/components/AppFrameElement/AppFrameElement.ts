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
  handleImport,
  handleFetchManifest,
  handleFetchManifestError,
  handleFetchManifestSuccess,
  isBootEvent,
  isLoadEvent,
  isMountEvent,
  isUnloadEvent,
  isUnmountEvent,
  isImportEvent,
  isFetchManifestEvent,
  isFetchManifestErrorEvent,
  isFetchManifestSuccessEvent,
  load,
} from '../../events';
import { Manifest, ServiceEvent, isManifest } from '../../types';
import {
  RegistrationEvents,
  RegistrationSuccessEvent,
  Registry,
  handleRegistrationSuccess,
  isRegistrationSuccessEvent,
  register,
} from '../../../registration';
import { AppRouterElement, Route } from '../../../routing';
import {
  NamespacedHandlers,
  addEventListeners,
  dispatchFrom,
} from '../../../utils';

export interface AppFrameElementProps {
  readonly name: string;
  readonly src: string;
}

export class AppFrameElement extends HTMLElement {
  public static readonly defaulSlotId = 'root';

  public loadErrorTime = 0;

  private _handlers: NamespacedHandlers = {
    [Registry.namespace]: {
      [RegistrationEvents.REGISTRATION_SUCCESS]: (e) =>
        this._handleRegistrationSuccess(e),
    },
    [this.name]: {
      [ServiceHookEvents.BOOT]: (e) => this._handleBoot(e),
      [ServiceHookEvents.LOAD]: (e) => this._handleLoad(e),
      [ServiceHookEvents.MOUNT]: (e) => this._handleMount(e),
      [ServiceHookEvents.UNLOAD]: (e) => this._handleUnload(e),
      [ServiceHookEvents.UNMOUNT]: (e) => this._handleUnmount(e),
      [ServiceOrchestrationEvents.FETCH_MANIFEST]: (e) =>
        this._handleFetchManifest(e),
      [ServiceOrchestrationEvents.FETCH_MANIFEST_ERROR]: (e) =>
        this._handleFetchManifestError(e),
      [ServiceOrchestrationEvents.FETCH_MANIFEST_SUCCESS]: (e) =>
        this._handleFetchManifestSuccess(e),
      [ServiceOrchestrationEvents.IMPORT]: (e) => this._handleImport(e),
    },
  };

  private _$frame: HTMLIFrameElement | null = null;

  private _listening = false;
  private _manifest: Manifest | null = null;
  private _name =
    this.getAttribute('name') !== null
      ? (this.getAttribute('name') as string)
      : '';
  private _src =
    this.getAttribute('src') !== null
      ? (this.getAttribute('src') as string)
      : '';
  // private _module: Record<string, unknown> | null = null;
  private _status = ServiceStatuses.UNREGISTERED;

  public get $ref(): HTMLIFrameElement | null {
    return this._$frame;
  }

  public get manifest(): Manifest | null {
    return this._manifest;
  }

  public set manifest(manifest: Manifest | null) {
    if (!this._manifest && isManifest(manifest)) {
      this._manifest = manifest;
    }
  }

  public get name(): string {
    return this._name;
  }

  public get registered(): boolean {
    return this._status !== ServiceStatuses.UNREGISTERED;
  }

  public get src(): string {
    return this._src;
  }

  public get status(): ServiceStatuses {
    return this._status;
  }

  constructor() {
    super();

    if (!this._name || !this._src) {
      throw new Error(
        `Invalid name or src. name: ${this._name} | src: ${this._src}`,
      );
    }

    if ('undefined' in this._handlers) {
      this._recoverFromUndefinedKeyInHandlers();
    }

    this._addEventListeners();
    register(this);
  }

  public load(): void {
    load(this);
  }

  public registerService(): void {
    dispatchFrom(this.name);
  }

  public setStatus(status: ServiceStatuses): void {
    this._status = status;
  }

  private _addEventListeners(): void {
    addEventListeners(this._listening, this._handlers, this._onListenersAdded);
  }

  public mount(route: Route, subRoute?: string): void {
    if (!this._getIframe(route)) {
      let url = '';

      url = subRoute
        ? `${this._src}#${AppRouterElement.config.hashPrefix}${subRoute}`
        : this._src;

      this._$frame = document.createElement('iframe');

      this._$frame.style['display'] = 'none';
      this._$frame.src = url;
      this._$frame.id = route.path;
      this._$frame.className = 'frame';

      let $slot = this._getSlot(route);

      if (!$slot) {
        throw new Error(`slot ${$slot} not found`);
      }

      $slot.appendChild(this._$frame);
    }
  }

  private _getIframe(route: Route): HTMLIFrameElement | null {
    return document.getElementById(route.path) as HTMLIFrameElement | null;
  }

  private _getSlot(route: Route): HTMLElement | null {
    return document.getElementById(
      route.slotId || AppFrameElement.defaulSlotId,
    );
  }

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

  private async _handleImport(e: ServiceEvent): Promise<void> {
    if (isImportEvent(e)) {
      handleImport(e);
    }
  }

  private async _handleFetchManifest(e: ServiceEvent): Promise<void> {
    if (isFetchManifestEvent(e)) {
      handleFetchManifest(e);
    }
  }

  private _handleFetchManifestError(e: ServiceEvent): void {
    if (isFetchManifestErrorEvent(e)) {
      handleFetchManifestError(e);
    }
  }

  private _handleFetchManifestSuccess(e: ServiceEvent): void {
    if (isFetchManifestSuccessEvent(e)) {
      handleFetchManifestSuccess(e);
    }
  }

  private _handleRegistrationSuccess(e: RegistrationSuccessEvent): void {
    if (isRegistrationSuccessEvent(e)) {
      handleRegistrationSuccess(e, this._onRegistrationSuccess);
    }
  }

  private _onListenersAdded = (): void => {
    this._listening = true;
  };

  private _onRegistrationSuccess = (): void => {
    if (this._status === ServiceStatuses.UNREGISTERED) {
      this._status = ServiceStatuses.REGISTERED;
    }
  };

  private _recoverFromUndefinedKeyInHandlers(): void {
    this._handlers = {
      ...this._handlers,
      [this._name]: {
        ...this._handlers['undefined'],
      },
    };

    delete this._handlers['undefined'];
  }

  [key: string]: unknown;
}
