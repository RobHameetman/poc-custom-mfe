import { RenderingEventHandlers } from '../RenderingEventHandlers';
import { RenderingEvents } from '../../enums';
import {
  RenderEvent,
  SetRendererListeningEvent,
  handleRender,
  handleSetRendererListening,
  isRenderEvent,
  isSetRendererListeningEvent,
} from '../../events';
import { Props } from '../../types';
import { Namespaces } from '../../../orchestration';
import { addEventListeners } from '../../../utils';

export class Renderer {
  public static readonly namespace = Namespaces.Renderer;
  private static _instance: Renderer;

  public static get instance(): Renderer {
    if (!this._instance) {
      const instance = new Renderer();

      this._instance = instance;
    }

    return this._instance;
  }

  private _listening = false;

  private _handlers: RenderingEventHandlers = {
    [RenderingEvents.RENDER]: (e) => this._handleRender(e),
    [RenderingEvents.SET_RENDERER_LISTENING]: (e) =>
      this._handleSetRendererListening(e),
  };

  private constructor() {}

  public addEventListeners() {
    if (!this._listening) {
      addEventListeners(
        this._listening,
        this._handlers,
        Renderer.namespace,
        RenderingEvents.SET_RENDERER_LISTENING,
      );
    }
  }

  // private _render = (): void => {};

  // private _dispatch = <T>(type: string, detail: T): void | never => {
  //   const dispatch = dispatchFrom(Renderer.namespace);

  //   dispatch(type, detail);
  // };

  private _handleRender<T = Props>(e: RenderEvent<T>): void {
    if (isRenderEvent<T>(e)) {
      handleRender<T>(e);
    }
  }

  private _handleSetRendererListening(e: SetRendererListeningEvent): void {
    if (isSetRendererListeningEvent(e)) {
      handleSetRendererListening(e, this._setIsListening);
    }
  }

  private _setIsListening = (value: boolean): void => {
    this._listening = value;
  };
}
