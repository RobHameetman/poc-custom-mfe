import { Namespaces, OrchestrationEvents } from '../../enums';
import {
  CallHooksEvent,
  CallHooksErrorEvent,
  CallHooksResolvedEvent,
  ProcessOrchestrationQueueEvent,
  RerouteUrlOnlyEvent,
  SetOrchestratorListeningEvent,
  handleCallHooks,
  handleCallHooksError,
  handleCallHooksResolved,
  handleProcessOrchestrationQueue,
  handleRerouteUrlOnly,
  handleSetOrchestratorListening,
  // handleStart,
  // handleStop,
  isCallHooksEvent,
  isCallHooksErrorEvent,
  isCallHooksResolvedEvent,
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
import {
  HandleCallHooksServiceAgent,
  OrchestrationEventHandlers,
} from '../../types';
import { RegisterServiceInput, Registry } from '../../../registration';
import { Renderer } from '../../../rendering';
import { Service, ServiceStatuses } from '../../../services';
import { addEventListeners, dispatchFrom } from '../../../utils';

export interface AppEntrypointElementProps {
  readonly urlRerouteOnly?: boolean;
}

export class AppEntrypointElement extends HTMLElement {
  public static readonly registry = Registry.instance;
  public static readonly renderer = Renderer.instance;

  private static _instance: AppEntrypointElement | undefined;
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
  private _orchestrationQueue: Array<CallHooksEvent> = [];
  private _running = false;

  private _handlers: OrchestrationEventHandlers = {
    [OrchestrationEvents.CALL_HOOKS]: (e) => this._handleCallHooks(e),
    [OrchestrationEvents.CALL_HOOKS_ERROR]: (e) =>
      this._handleCallHooksError(e),
    [OrchestrationEvents.CALL_HOOKS_RESOLVED]: (e) =>
      this._handleCallHooksResolved(e),
    [OrchestrationEvents.PROCESS_ORCHESTRATION_QUEUE]: (e) =>
      this._handleProcessOrchestrationQueue(e),
    [OrchestrationEvents.REROUTE_URL_ONLY]: (e) =>
      this._handleRerouteUrlOnly(e),
    [OrchestrationEvents.SET_ORCHESTRATOR_LISTENING]: (e) =>
      this._handleSetOrchestratorListening(e),
    // [OrchestrationEvents.START]: (e) => this._handleStart(e),
    // [OrchestrationEvents.STOP]: (e) => this._handleStop(e),
  };

  constructor() {
    super();

    if (!AppEntrypointElement._instance) {
      addEventListeners(
        this._listening,
        this._handlers,
        Namespaces.App,
        OrchestrationEvents.SET_ORCHESTRATOR_LISTENING,
      );

      Registry.instance.addEventListeners();
      Renderer.instance.addEventListeners();

      AppEntrypointElement._instance = this;
    }

    console.log('Hello, AppEntrypointElement!');

    return AppEntrypointElement._instance;
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

  private _dispatch = <T>(type: string, detail: T): void | never => {
    const dispatch = dispatchFrom(Namespaces.App);

    dispatch(type, detail);
  };

  private _endOrchestration = (): void => {
    this._isOrchestrating = false;
  };

  private _getServicesToLoad(): Array<Service> {
    return getServicesToLoad(this._validateRoute);
  }

  private _getServicesToMount(): Array<Service> {
    return getServicesToMount(this._validateRoute);
  }

  private _getServicesToUnload(): Array<Service> {
    return getServicesToUnload();
  }

  private _getServicesToUnmount(): Array<Service> {
    return getServicesToUnmount(this._validateRoute);
  }

  private _getServicesToUpdate(): HandleCallHooksServiceAgent {
    return {
      toLoad: this._getServicesToLoad(),
      toMount: this._getServicesToMount(),
      toUnmount: this._getServicesToUnmount(),
      toUnload: this._getServicesToUnload(),
    };
  }

  private _handleCallHooks(e: CallHooksEvent): void {
    if (isCallHooksEvent(e)) {
      return handleCallHooks(
        e,
        this._isOrchestrating,
        this._pushOrchestrationQueue,
        this._getServicesToUpdate,
        this.isRunning,
        this._beginOrchestration,
      );
    }
  }

  private _handleCallHooksError(e: CallHooksErrorEvent): void {
    if (isCallHooksErrorEvent(e)) {
      return handleCallHooksError(
        e,
        this._dispatch,
        this._hasPendingCalls,
        this._endOrchestration,
      );
    }
  }

  private _handleCallHooksResolved(e: CallHooksResolvedEvent): void {
    if (isCallHooksResolvedEvent(e)) {
      return handleCallHooksResolved(
        e,
        this._dispatch,
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
        this._handleCallHooks,
        this._shiftOrchestrationQueue,
        this._dispatch,
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

  // private _handleStart(e: OrchestrationEvent): void {
  //   handleStart(e, this._start);
  // }

  // private _handleStop(e: OrchestrationEvent): void {
  //   handleStop(e, this._stop);
  // }

  private _hasPendingCalls = (): boolean => {
    return this._orchestrationQueue.length > 0;
  };

  private _pushOrchestrationQueue = (e: CallHooksEvent): void => {
    this._orchestrationQueue.push(e);
  };

  private _setIsListening = (): void => {
    this._listening = true;
  };

  // private _start = (): void => {
  //   this._running = true;
  // };

  // private _stop = (): void => {
  //   this._running = false;
  // };

  private _shiftOrchestrationQueue = (): CallHooksEvent | undefined => {
    return this._orchestrationQueue.shift();
  };

  private _validateRoute = (
    service: Service,
    status: ServiceStatuses,
  ): boolean => {
    return validateRoute(service, status);
  };
}
