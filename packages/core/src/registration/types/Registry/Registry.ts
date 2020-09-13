import { isRegisterServiceInput } from '../RegisterServiceInput';
import { RegistrationEventHandlers } from '../RegistrationEventHandlers';
import { RegistrationEvents } from '../../enums';
import {
  AddServiceEvent,
  RegisterEvent,
  RegistrationErrorEvent,
  RegistrationSuccessEvent,
  RemoveServiceEvent,
  SetRegistryListeningEvent,
  handleAddService,
  handleRegistrationError,
  handleRegistrationSuccess,
  handleRemoveService,
  handleSetRegistryListening,
  isAddServiceEvent,
  isRegistrationErrorEvent,
  isRegistrationSuccessEvent,
  isRemoveServiceEvent,
  isSetRegistryListeningEvent,
} from '../../events';
import { getRegistryDispatch } from '../../functions';
import { Namespaces } from '../../../orchestration';
import { Service } from '../../../services';
import { addEventListeners, dispatchFrom } from '../../../utils';

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

  public static get services(): ReadonlyArray<Service> {
    return this._instance._services;
  }

  private _services: Array<Service> = [];
  private _listening = false;

  private _handlers: RegistrationEventHandlers = {
    [RegistrationEvents.ADD_SERVICE]: (e) => this._handleAddService(e),
    [RegistrationEvents.REGISTRATION_ERROR]: (e) =>
      this._handleRegistrationSuccess(e),
    [RegistrationEvents.REGISTRATION_SUCCESS]: (e) =>
      this._handleRegistrationError(e),
    [RegistrationEvents.REMOVE_SERVICE]: (e) => this._handleRemoveService(e),
    [RegistrationEvents.SET_REGISTRY_LISTENING]: (e) =>
      this._handleSetRegistryListening(e),
  };

  private constructor() {}

  public static asyncMap<U>(
    callback: (
      service: Service,
      index: number,
      arr: Array<Service>,
    ) => Promise<U>,
    services: Array<Service> = this._instance._services,
  ): Array<Promise<U>> {
    return services.map<Promise<U>>(callback);
  }

  public static find(
    callback: (service: Service, index: number, arr: Array<Service>) => boolean,
    services: Array<Service> = this._instance._services,
  ): Service | undefined {
    return services.find(callback);
  }

  public static filter(
    callback: (service: Service, index: number, arr: Array<Service>) => void,
    services: Array<Service> = this._instance._services,
  ): Array<Service> {
    return services.filter(callback);
  }

  public static forEach(
    callback: (service: Service, index: number, arr: Array<Service>) => void,
    services: Array<Service> = this._instance._services,
  ): void {
    services.forEach(callback);
  }

  public static map<U>(
    callback: (service: Service, index: number, arr: Array<Service>) => U,
    services: Array<Service> = this._instance._services,
  ): Array<U> {
    return services.map<U>(callback);
  }

  public static tryToRegisterService(e: Event): void {
    const dispatch = getRegistryDispatch();

    try {
      const { detail } = e as RegisterEvent;

      if (isRegisterServiceInput(detail)) {
        const {
          name,
          manifest,
          activeWhen,
          customProps,
          importChunk,
          importEntrypoint,
          importManifest,
          importStylesheet,
        } = detail;

        const service = new Service(
          name,
          manifest,
          activeWhen,
          importChunk,
          importEntrypoint,
          importManifest,
          importStylesheet,
          customProps,
        );

        dispatch(RegistrationEvents.ADD_SERVICE, service);
      }
    } catch (err) {
      dispatch(RegistrationEvents.REGISTRATION_ERROR, err);
    }
  }

  public addEventListeners() {
    if (!this._listening) {
      addEventListeners(
        this._listening,
        this._handlers,
        Registry.namespace,
        RegistrationEvents.SET_REGISTRY_LISTENING,
      );
    }
  }

  private _addService = <T = Record<string, unknown>>(
    service: Service<T>,
  ): void => {
    this._services.push(service as Service);
  };

  private _dispatch = <T>(type: string, detail: T): void | never => {
    const dispatch = dispatchFrom(Registry.namespace);

    dispatch(type, detail);
  };

  private _handleAddService<T = Record<string, unknown>>(
    e: AddServiceEvent<T>,
  ): void {
    if (isAddServiceEvent<T>(e)) {
      handleAddService<T>(e, this._addService, this._dispatch);
    }
  }

  private _handleRegistrationError(e: RegistrationErrorEvent): void {
    if (isRegistrationErrorEvent(e)) {
      handleRegistrationError(e);
    }
  }

  private _handleRegistrationSuccess(e: RegistrationSuccessEvent): void {
    if (isRegistrationSuccessEvent(e)) {
      handleRegistrationSuccess(e);
    }
  }

  private _handleRemoveService(e: RemoveServiceEvent): void {
    if (isRemoveServiceEvent(e)) {
      handleRemoveService(e);
    }
  }

  private _handleSetRegistryListening(e: SetRegistryListeningEvent): void {
    if (isSetRegistryListeningEvent(e)) {
      handleSetRegistryListening(e, this._setIsListening);
    }
  }

  private _setIsListening = (value: boolean): void => {
    this._listening = value;
  };
}
