import { RoutingEvents } from '../../enums';
import {
  NavigateToUrlEvent,
  SetRouterListeningEvent,
  handleNavigateToUrl,
  handleSetRouterListening,
  isNavigateToUrlEvent,
  isSetRouterListeningEvent,
} from '../../events';
import { RoutingEventHandlers } from '../../types';
import { addEventListeners } from '../../../utils';

export interface AppRouterElementProps {
  readonly name: string;
}

export class AppRouterElement extends HTMLElement {
  public static readonly namespace = 'Router';
  private static _instance: AppRouterElement;

  public static get instance(): AppRouterElement {
    if (!this._instance) {
      const instance = new AppRouterElement();

      this._instance = instance;
    }

    return this._instance;
  }

  private _listening: boolean = false;

  private _handlers: RoutingEventHandlers = {
    [RoutingEvents.NAVIGATE_TO_URL]: (e) => this._handleNavigateToUrl(e),
    [RoutingEvents.SET_ROUTER_LISTENING]: (e) => this._handleSetRouterListening(e),
  };

  constructor() {
    super();

    if (!AppRouterElement._instance) {
      this._addEventListeners();

      AppRouterElement._instance = this;
    }

    return AppRouterElement._instance;
  }

  public attributeChangedCallback(
    attr: string,
    currentValue: string,
    newValue: string,
  ): void {
    switch (attr) {
    }
  }

  private _addEventListeners(): void {
    addEventListeners(
      this._listening,
      this._handlers,
      AppRouterElement.namespace,
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
