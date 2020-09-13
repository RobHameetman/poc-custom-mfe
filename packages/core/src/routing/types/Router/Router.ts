import { RoutingEventHandlers } from '../RoutingEventHandlers';
import { RoutingEvents } from '../../enums';
import {
  NavigateToUrlEvent,
  SetRouterListeningEvent,
  handleNavigateToUrl,
  handleSetRouterListening,
  isNavigateToUrlEvent,
  isSetRouterListeningEvent,
} from '../../events';
import { Namespaces } from '../../../orchestration';
import { addEventListeners } from '../../../utils';

export class Router {
  public static readonly namespace = Namespaces.Router;
  private static _instance: Router;

  public static get instance(): Router {
    if (!this._instance) {
      const instance = new Router();

      this._instance = instance;
    }

    return this._instance;
  }

  private _listening: boolean = false;

  private _handlers: RoutingEventHandlers = {
    [RoutingEvents.NAVIGATE_TO_URL]: (e) => this._handleNavigateToUrl(e),
    [RoutingEvents.SET_ROUTER_LISTENING]: (e) =>
      this._handleSetRouterListening(e),
  };

  private constructor() {
    this._addEventListeners();
  }

  private _addEventListeners(): void {
    addEventListeners(
      this._listening,
      this._handlers,
      Router.namespace,
      RoutingEvents.SET_ROUTER_LISTENING,
    );
  }

  private _handleNavigateToUrl(e: NavigateToUrlEvent): void {
    if (isNavigateToUrlEvent(e)) {
      handleNavigateToUrl(e);
    }
  }

  private _handleSetRouterListening(e: SetRouterListeningEvent): void {
    if (isSetRouterListeningEvent(e)) {
      handleSetRouterListening(e, this._setIsListening);
    }
  }

  private _setIsListening = (value: boolean): void => {
    this._listening = value;
  };
}
