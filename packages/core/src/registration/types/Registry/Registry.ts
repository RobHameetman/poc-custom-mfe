import { RegistrationEvents } from '../../enums';
import {
  UnregisterEvent,
  SetRegistryListeningEvent,
  handleRegister,
  handleUnregister,
  handleSetRegistryListening,
  isRegisterEvent,
  isUnregisterEvent,
  isSetRegistryListeningEvent,
} from '../../events';
import { Namespaces } from '../../../orchestration';
import { AppFrameElement } from '../../../services';
import { NamespacedHandlers, addEventListeners } from '../../../utils';

export class Registry {
  public static readonly namespace = Namespaces.Registry;
  private static _instance: Registry;

  public static get instance(): Registry {
    if (!this._instance) {
      const instance = new Registry();

      this._instance = instance;
    }

    return this._instance;
  }

  public static get services(): Array<AppFrameElement> {
    return Registry._instance._services;
  }

  public get services(): Array<AppFrameElement> {
    return this._services;
  }

  private _services: Array<AppFrameElement> = [];
  private _listening = false;

  private _handlers: NamespacedHandlers = {
    [Registry.namespace]: {
      [RegistrationEvents.REGISTER]: (e) => this._handleRegister(e),
      [RegistrationEvents.UNREGISTER]: (e) => this._handleUnregister(e),
      [RegistrationEvents.SET_REGISTRY_LISTENING]: (e) =>
        this._handleSetRegistryListening(e),
    },
  };

  private constructor() {
    this._addEventListeners();
  }

  public static handleRegister = (e: Event): void => {
    Registry._instance._handleRegister(e);
  };

  public static asyncMap<U>(
    callback: (
      service: AppFrameElement,
      index: number,
      arr: Array<AppFrameElement>,
    ) => Promise<U>,
    registry = Registry._instance,
  ): Array<Promise<U>> {
    return registry.map<Promise<U>>(callback);
  }

  public static find(
    callback: (
      service: AppFrameElement,
      index: number,
      arr: Array<AppFrameElement>,
    ) => boolean,
    registry = Registry._instance,
  ): AppFrameElement | undefined {
    return registry.find(callback);
  }

  public static filter(
    callback: (
      service: AppFrameElement,
      index: number,
      arr: Array<AppFrameElement>,
    ) => void,
    registry = Registry._instance,
  ): Array<AppFrameElement> {
    return registry.filter(callback);
  }

  public static forEach(
    callback: (
      service: AppFrameElement,
      index: number,
      arr: Array<AppFrameElement>,
    ) => void,
    registry = Registry._instance,
  ): void {
    return registry.forEach(callback);
  }

  public static map<U>(
    callback: (
      service: AppFrameElement,
      index: number,
      arr: Array<AppFrameElement>,
    ) => U,
    registry = Registry._instance,
  ): Array<U> {
    return registry.map<U>(callback);
  }

  public asyncMap<U>(
    callback: (
      service: AppFrameElement,
      index: number,
      arr: Array<AppFrameElement>,
    ) => Promise<U>,
  ): Array<Promise<U>> {
    return this._services.map<Promise<U>>(callback);
  }

  public find(
    callback: (
      service: AppFrameElement,
      index: number,
      arr: Array<AppFrameElement>,
    ) => boolean,
  ): AppFrameElement | undefined {
    return this._services.find(callback);
  }

  public filter(
    callback: (
      service: AppFrameElement,
      index: number,
      arr: Array<AppFrameElement>,
    ) => void,
  ): Array<AppFrameElement> {
    return this._services.filter(callback);
  }

  public forEach(
    callback: (
      service: AppFrameElement,
      index: number,
      arr: Array<AppFrameElement>,
    ) => void,
  ): void {
    return this._services.forEach(callback);
  }

  public map<U>(
    callback: (
      service: AppFrameElement,
      index: number,
      arr: Array<AppFrameElement>,
    ) => U,
  ): Array<U> {
    return this._services.map<U>(callback);
  }

  private _addEventListeners() {
    if (!this._listening) {
      addEventListeners(
        this._listening,
        this._handlers,
        this._onListenersAdded,
      );
    }
  }

  private _handleRegister(e: Event): void {
    if (isRegisterEvent(e)) {
      handleRegister(e, this._onRegister);
    }
  }

  private _handleSetRegistryListening(e: SetRegistryListeningEvent): void {
    if (isSetRegistryListeningEvent(e)) {
      handleSetRegistryListening(e, this._setIsListening);
    }
  }

  private _handleUnregister(e: UnregisterEvent): void {
    if (isUnregisterEvent(e)) {
      handleUnregister(e, this._onUnregister);
    }
  }

  private _onListenersAdded = (): void => {
    this._listening = true;
  };

  private _onRegister = async (service: AppFrameElement): Promise<void> => {
    this._services.push(service as AppFrameElement);
  };

  private _onUnregister = async (service: AppFrameElement): Promise<void> => {
    if (this._services.includes(service)) {
      this._services = this._services.splice(
        this._services.indexOf(service),
        1,
      );
    }
  };
  private _setIsListening = (value: boolean): void => {
    this._listening = value;
  };
}
