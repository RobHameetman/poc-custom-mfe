import { Namespaces, OrchestrationEvents } from '../../enums';
import {
  OrchestrateEvent,
  OrchestrationErrorEvent,
  ProcessOrchestrationQueueEvent,
  RerouteUrlOnlyEvent,
  SetOrchestratorListeningEvent,
  handleOrchestrate,
  handleOrchestrationError,
  handleProcessOrchestrationQueue,
  handleRerouteUrlOnly,
  handleSetOrchestratorListening,
  isOrchestrateEvent,
  isOrchestrationErrorEvent,
  isRerouteUrlOnlyEvent,
  isProcessOrchestrationQueueEvent,
  isSetOrchestratorListeningEvent,
} from '../../events';
import {
  getServicesToLoad,
  getServicesToMount,
  getServicesToUnload,
  getServicesToUnmount,
  validateRoute,
} from '../../functions';
import { HandleCallHooksServiceAgent } from '../../types';
import { RegisterServiceInput, Registry } from '../../../registration';
import { AppFrameElement, ServiceStatuses } from '../../../services';
import {
  NamespacedHandlers,
  addEventListeners,
  dispatchFrom,
} from '../../../utils';

export interface AppContainerElementProps {
  readonly urlRerouteOnly?: boolean;
}

export class AppContainerElement extends HTMLElement {
  public static readonly namespace = Namespaces.App;
  public static readonly registry = Registry.instance;

  private static _instance: AppContainerElement | undefined;
  private static _$$initConfirmed = false;

  public static get $$initConfirmed(): boolean {
    return this._$$initConfirmed;
  }

  public static confirm$$Init(): void {
    if (!this._$$initConfirmed) {
      this._$$initConfirmed = true;
    }
  }

  private _isOrchestrating = false;
  private _listening = false;
  private _orchestrationQueue: Array<OrchestrateEvent> = [];
  private _running = false;

  private _handlers: NamespacedHandlers = {
    [AppContainerElement.namespace]: {
      [OrchestrationEvents.ORCHESTRATE]: (e) => this._handleOrchestrate(e),
      [OrchestrationEvents.ORCHESTRATION_ERROR]: (e) =>
        this._handleOrchestrationError(e),
      [OrchestrationEvents.PROCESS_ORCHESTRATION_QUEUE]: (e) =>
        this._handleProcessOrchestrationQueue(e),
      [OrchestrationEvents.REROUTE_URL_ONLY]: (e) =>
        this._handleRerouteUrlOnly(e),
      [OrchestrationEvents.SET_ORCHESTRATOR_LISTENING]: (e) =>
        this._handleSetOrchestratorListening(e),
    },
  };

  constructor() {
    super();

    if (!AppContainerElement._instance) {
      addEventListeners(
        this._listening,
        this._handlers,
        this._onListenersAdded,
      );

      AppContainerElement._instance = this;
    }

    return AppContainerElement._instance;
  }

  public attributeChangedCallback(
    attr: string,
    currentValue: string,
    newValue: string,
  ): void {
    switch (attr) {
    }
  }

  public isRunning = (): boolean => {
    return this._running;
  };

  public registerService<T = Record<string, unknown>>(
    input: RegisterServiceInput<T>,
  ): void {
    dispatchFrom(Namespaces.App);
  }

  private _beginOrchestration = (): void => {
    this._isOrchestrating = true;
  };

  private _endOrchestration = (): void => {
    this._isOrchestrating = false;
  };

  private _getServicesToLoad(): Array<AppFrameElement> {
    return getServicesToLoad();
  }

  private _getServicesToMount(): Array<AppFrameElement> {
    return getServicesToMount(this._validateRoute);
  }

  private _getServicesToUnload(): Array<AppFrameElement> {
    return getServicesToUnload();
  }

  private _getServicesToUnmount(): Array<AppFrameElement> {
    return getServicesToUnmount(this._validateRoute);
  }

  private _getServicesToUpdate = (): HandleCallHooksServiceAgent => {
    return {
      toLoad: this._getServicesToLoad(),
      toMount: this._getServicesToMount(),
      toUnmount: this._getServicesToUnmount(),
      toUnload: this._getServicesToUnload(),
    };
  };

  private _handleOrchestrate(e: OrchestrateEvent): void {
    if (isOrchestrateEvent(e)) {
      return handleOrchestrate(
        e,
        this._isOrchestrating,
        this._pushOrchestrationQueue,
        this._getServicesToUpdate,
        this.isRunning,
        this._beginOrchestration,
      );
    }
  }

  private _handleOrchestrationError(e: OrchestrationErrorEvent): void {
    if (isOrchestrationErrorEvent(e)) {
      return handleOrchestrationError(
        e,
        this._hasPendingCalls,
        this._endOrchestration,
      );
    }
  }

  private _handleProcessOrchestrationQueue(
    e: ProcessOrchestrationQueueEvent,
  ): void {
    if (isProcessOrchestrationQueueEvent(e)) {
      handleProcessOrchestrationQueue(
        e,
        this._handleOrchestrate,
        this._shiftOrchestrationQueue,
      );
    }
  }

  private _handleRerouteUrlOnly(e: RerouteUrlOnlyEvent): void {
    if (isRerouteUrlOnlyEvent(e)) {
      handleRerouteUrlOnly(e);
    }
  }

  private _handleSetOrchestratorListening(
    e: SetOrchestratorListeningEvent,
  ): void {
    if (isSetOrchestratorListeningEvent(e)) {
      handleSetOrchestratorListening(e, this._setIsListening);
    }
  }

  private _hasPendingCalls = (): boolean => {
    return this._orchestrationQueue.length > 0;
  };

  private _onListenersAdded = (): void => {
    this._listening = true;
  };

  private _pushOrchestrationQueue = (e: OrchestrateEvent): void => {
    this._orchestrationQueue.push(e);
  };

  private _setIsListening = (): void => {
    this._listening = true;
  };

  private _shiftOrchestrationQueue = (): OrchestrateEvent | undefined => {
    return this._orchestrationQueue.shift();
  };

  private _validateRoute = (
    service: AppFrameElement,
    status: ServiceStatuses,
  ): boolean => {
    return validateRoute(service, status);
  };
}
