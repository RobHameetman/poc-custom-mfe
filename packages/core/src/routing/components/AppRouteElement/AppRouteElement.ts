import { AppRouterElement } from '../AppRouterElement';
import { AppFrameElement } from '../../../services';

export interface AppRouteElementProps {
  readonly path: string;
  readonly exact?: boolean;
}

export class AppRouteElement extends HTMLElement {
  public get exact(): boolean {
    return this._exact;
  }

  public get path(): string {
    return this._path;
  }

  private _children: ReadonlyArray<Node> = [];
  private _frames: ReadonlyArray<AppFrameElement> = [];
  private _exact = false;
  private _path = '';
  private _$router: AppRouterElement;

  constructor() {
    super();

    this._$router = AppRouterElement.instance;

    const path = this.getAttribute('path');

    if (!path) {
      throw new Error('<app-route> element must have a path');
    }

    this._path = path;
    this._exact = this.hasAttribute('exact');

    this._onChildrenUpdated(Array.from(this.childNodes));

    this._$router.addRoute(path, this._frames);
  }

  public attributeChangedCallback(
    attr: string,
    currentValue: string,
    newValue: string,
  ) {
    switch (attr) {
      case 'exact':
        this._exact = newValue === 'true';

        break;
      case 'path':
        if (!this._path) {
          this._path = newValue;
          this._$router.addRoute(newValue, this._frames);
        }

        break;
      default:
        break;
    }
  }

  public connectedCallback() {
    const observer = new MutationObserver((mutations) =>
      mutations.forEach(({ addedNodes, removedNodes: removedNodeList }) => {
        const removedNodes = Array.from(removedNodeList);

        this._onChildrenUpdated([
          ...this._children.filter((node) => !removedNodes.includes(node)),
          ...Array.from(addedNodes),
        ]);
      }),
    );

    observer.observe(this, { childList: true });
  }

  private _onChildrenUpdated = (children: ReadonlyArray<Node>) => {
    const frames: Array<AppFrameElement> = [];

    children.forEach((child) => {
      if (child.nodeName === 'APP-FRAME') {
        frames.push(child as AppFrameElement);
      }
    });

    this._frames = frames;
    this._children = children;
  };
}
