import { HandleCallHooksServiceAgent } from '../HandleCallHooksServiceAgent';
import { OrchestrationEvent } from '../OrchestrationEvent';
import { OrchestrationEventHandlers } from '../OrchestrationEventHandlers';
import { OrchestrationEvents } from '../../enums';
import {
  CallHooksEvent,
  handleCallHooks,
  handleCallHooksError,
  handleCallHooksSuccess,
  handleProcessOrchestrationQueue,
  handleRerouteUrlOnly,
  handleSetOrchestratorListening,
  handleStart,
  handleStop,
  isCallHooksEvent,
  isCallHooksErrorEvent,
  isCallHooksSuccessEvent,
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
import { RegisterServiceInput, Registry } from '../../../registration';
import { Service, ServiceStatuses } from '../../../services';
import { addEventListeners, dispatchFrom } from '../../../utils';

export class Orchestrator {
  public static readonly namespace = 'Orchestrator';
  public static readonly registry = Registry.instance;

  private static _instance: Orchestrator | undefined;

  constructor() {
    if (!Orchestrator._instance) {
      this._addEventListeners();

      Orchestrator._instance = this;
    }

    return Orchestrator._instance;
  }

  private _isOrchestrating = false;
  private _listening = false;
  private _orchestrationQueue: Array<CallHooksEvent> = [];
  private _running = false;

  private _handlers: OrchestrationEventHandlers = {
    [OrchestrationEvents.CALL_HOOKS]: (e) => this._handleCallHooks(e),
    [OrchestrationEvents.CALL_HOOKS_ERROR]: (e) =>
      this._handleCallHooksError(e),
    [OrchestrationEvents.CALL_HOOKS_SUCCESS]: (e) =>
      this._handleCallHooksSuccess(e),
    [OrchestrationEvents.PROCESS_ORCHESTRATION_QUEUE]: (e) =>
      this._handleProcessOrchestrationQueue(e),
    [OrchestrationEvents.REROUTE_URL_ONLY]: (e) =>
      this._handleRerouteUrlOnly(e),
    [OrchestrationEvents.SET_ORCHESTRATOR_LISTENING]: (e) =>
      this._handleSetOrchestratorListening(e),
    [OrchestrationEvents.START]: (e) => this._handleStart(e),
    [OrchestrationEvents.STOP]: (e) => this._handleStop(e),
  };

  public isRunning = (): boolean => {
    return this._running;
  };

  public registerService<T = Record<string, unknown>>(
    input: RegisterServiceInput<T>,
  ): void {
    //
  }

  private _beginOrchestration = (): void => {
    this._isOrchestrating = true;
  };

  private _dispatch = <T>(type: string, detail: T): void | never => {
    const dispatch = dispatchFrom(Orchestrator.namespace);

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
    return getServicesToUnload(this._validateRoute);
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

  private _handleCallHooks(e: OrchestrationEvent): void {
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

  private _handleCallHooksError(e: OrchestrationEvent): void {
    if (isCallHooksErrorEvent(e)) {
      return handleCallHooksError(
        e,
        this._dispatch,
        this._hasPendingCalls,
        this._endOrchestration,
      );
    }
  }

  private _handleCallHooksSuccess(e: OrchestrationEvent): void {
    if (isCallHooksSuccessEvent(e)) {
      return handleCallHooksSuccess(
        e,
        this._dispatch,
        this._hasPendingCalls,
        this._endOrchestration,
      );
    }
  }

  private _handleRerouteUrlOnly(e: OrchestrationEvent): void {
    if (isRerouteUrlOnlyEvent(e)) {
      handleRerouteUrlOnly(e);
    }
  }

  private _handleProcessOrchestrationQueue(e: OrchestrationEvent): void {
    if (isProcessOrchestrationQueueEvent(e)) {
      handleProcessOrchestrationQueue(
        e,
        this._handleCallHooks,
        this._shiftOrchestrationQueue,
        this._dispatch,
      );
    }
  }

  private _handleSetOrchestratorListening(e: OrchestrationEvent): void {
    if (isSetOrchestratorListeningEvent(e)) {
      handleSetOrchestratorListening(e, this._setIsListening);
    }
  }

  private _handleStart(e: OrchestrationEvent): void {
    handleStart(e, this._start);
  }

  private _handleStop(e: OrchestrationEvent): void {
    handleStop(e, this._stop);
  }

  private _hasPendingCalls = (): boolean => {
    return this._orchestrationQueue.length > 0;
  };

  private _pushOrchestrationQueue = (e: CallHooksEvent): void => {
    this._orchestrationQueue.push(e);
  };

  private _setIsListening = (): void => {
    this._listening = true;
  };

  private _start = (): void => {
    this._running = true;
  };

  private _stop = (): void => {
    this._running = false;
  };

  private _shiftOrchestrationQueue = (): CallHooksEvent | undefined => {
    return this._orchestrationQueue.shift();
  };

  private _validateRoute = (
    service: Service,
    status: ServiceStatuses,
  ): boolean => {
    return validateRoute(service, status);
  };

  private _addEventListeners(): void {
    addEventListeners(
      this._listening,
      this._handlers,
      Orchestrator.namespace,
      OrchestrationEvents.SET_ORCHESTRATOR_LISTENING,
    );
  }
}
