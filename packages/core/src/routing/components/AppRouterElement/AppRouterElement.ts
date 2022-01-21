import { RoutingEvents } from '../../enums';
import {
  NavigateEvent,
  ActivateRouteEvent,
  SetRouterListeningEvent,
  handleNavigate,
  handleActivateRoute,
  handleSetRouterListening,
  isActivateRouteEvent,
  isNavigateEvent,
  isSetRouterListeningEvent,
  navigate,
} from '../../events';
import { Route, RouterConfig } from '../../types';
import {
  RegistrationEvents,
  RegistrationSuccessEvent,
  handleRegistrationSuccess,
  isRegistrationSuccessEvent,
} from '../../../registration';
import { AppFrameElement } from '../../../services';
import { addEventListeners } from '../../../utils';
import { NamespacedHandlers } from '../../../utils/types/NamespacedHandlers/NamespacedHandlers';
import { Registry } from '../../../registration/types/Registry/Registry';

export interface AppRouterElementProps {
  readonly name: string;
}

export class AppRouterElement extends HTMLElement {
  public static readonly namespace = 'Router';

  public static readonly config: RouterConfig = {
    hashPrefix: '/',
    additionalHeight: 5,
    handleNotification: () => {},
    allowedOrigins: '*',
  };

  private static _instance: AppRouterElement;

  public static get instance(): AppRouterElement {
    if (!this._instance) {
      const instance = new AppRouterElement();

      this._instance = instance;
    }

    return this._instance;
  }

  public get activatedRoute(): Route {
    return this._activatedRoute;
  }

  public readonly defaultRoute: Route = {
    path: '/',
    frames: [],
    slotId: AppFrameElement.defaulSlotId,
    router: this,
  };

  private _activatedRoute: Route = this.defaultRoute;
  private _activationThreshold = 1;

  private _listening = false;
  // private _loading = true;
  private _registeredServices = 0;
  private _routes: ReadonlyArray<Route> = [this.defaultRoute];

  private _handlers: NamespacedHandlers = {
    [Registry.namespace]: {
      [RegistrationEvents.REGISTRATION_SUCCESS]: (e) =>
        this._handleRegistrationSuccess(e),
    },
    [AppRouterElement.namespace]: {
      [RoutingEvents.ACTIVATE_ROUTE]: (e) => this._handleActivateRoute(e),
      [RoutingEvents.NAVIGATE]: (e) => this._handleNavigate(e),
      [RoutingEvents.SET_ROUTER_LISTENING]: (e) =>
        this._handleSetRouterListening(e),
    },
  };

  constructor() {
    super();

    if (!AppRouterElement._instance) {
      this._addEventListeners();
      this._setActivationThreshold();

      AppRouterElement._instance = this;
    }

    return AppRouterElement._instance;
  }

  public addRoute(
    path: string,
    frames: ReadonlyArray<AppFrameElement>,
    slotId?: string,
  ): void {
    if (this._routes.find((route) => path === route.path)) {
      return;
    }

    this._routes = [
      ...this._routes,
      {
        path,
        frames,
        slotId: slotId || AppFrameElement.defaulSlotId,
        router: this,
      },
    ];

    if (this._registeredServices === this._activationThreshold) {
      navigate(this._routes, this._routes[0].path);
    }
  }

  public attributeChangedCallback(
    attr: string,
    currentValue: string,
    newValue: string,
  ): void {
    switch (attr) {
    }
  }

  public preload(): void {
    this._routes.forEach((route) => {
      route.frames.forEach((frame) => {
        frame.mount(route);
      });
    });
  }

  // public go(path: string, subRoute?: string): void {
  //   let route = this._routes.find((route) => route.path === path);

  //   if (!route) {
  //     throw Error(`route not found: ${path}`);
  //   }

  //   route.frames.forEach((frame) => {
  //     frame.mount(route as Route, subRoute);
  //   });

  //   this._activateRoute(route, subRoute);
  // }

  // private _activateRoute(route: Route, subRoute?: string) {
  //   this._routes.forEach((currentRoute) => {
  //     const { frames } = currentRoute;

  //     frames.forEach(($frame) => {
  //       if ($frame.$ref && currentRoute.slotId === route.slotId) {
  //         $frame.$ref.style['display'] =
  //           route === currentRoute ? 'block' : 'none';
  //       }
  //     });
  //   });

  //   if (subRoute) {
  //     route.frames.forEach((frame) => {
  //       if (frame.$ref) {
  //         frame.$ref.contentWindow?.postMessage(
  //           { message: 'sub-route', route: subRoute },
  //           AppRouterElement.config.allowedOrigins,
  //         );
  //       }
  //     });
  //   }

  //   this._ActivateRoute(route, subRoute);
  //   this._activatedRoute = route;
  // }

  private _addEventListeners(): void {
    if (!this._listening) {
      addEventListeners(
        this._listening,
        this._handlers,
        this._onListenersAdded,
      );
    }
  }

  private _handleActivateRoute(e: ActivateRouteEvent): void {
    if (isActivateRouteEvent(e)) {
      handleActivateRoute(e, this._onRouteActivated);
    }
  }

  private _handleNavigate(e: NavigateEvent): void {
    if (isNavigateEvent(e)) {
      handleNavigate(e);
    }
  }

  private _handleRegistrationSuccess(e: RegistrationSuccessEvent): void {
    if (isRegistrationSuccessEvent(e)) {
      handleRegistrationSuccess(e, this._onRegistrationSuccess);
    }
  }

  private _handleSetRouterListening(e: SetRouterListeningEvent): void {
    if (isSetRouterListeningEvent(e)) {
      handleSetRouterListening(e, this._setIsListening);
    }
  }

  private _onListenersAdded = (): void => {
    this._listening = true;
  };

  private _onRegistrationSuccess = (): void => {
    this._registeredServices += 1;

    if (this._registeredServices === this._activationThreshold) {
      navigate(this._routes, this._routes[0].path);
    }
  };

  private _onRouteActivated = (route: Route): void => {
    this._activatedRoute = route;
  };

  private _setActivationThreshold(): void {
    const children = Array.from(this.childNodes).filter(
      (node) => node.nodeName === 'APP-ROUTE',
    ).length;

    this._activationThreshold = children ? children : 1;
  }

  private _setIsListening = (value: boolean): void => {
    this._listening = value;
  };
}
