export interface ComponentConfig {
  /**
   * If `true`, the component will use native shadow-dom encapsulation, it will fallback to
   * `scoped` if the browser does not support shadow-dom natively. Defaults to `false`.
   * Additionally, `shadow` can also be given options when attaching the shadow root.
   */
  readonly shadow?: boolean;

  /**
   * Tag name of the web component. Ideally, the tag name must be globally unique,
   * so it's recommended to choose an unique prefix for all your components within the same collection.
   *
   * In addition, tag name must contain a '-'
   */
  readonly tag: string;
}

export type ComponentDecorator = (config: ComponentConfig) => ClassDecorator;

type WebComponent<C extends Function> = C & CustomElementConstructor;

const DEFAULT_COMPONENT: ComponentConfig = {
  shadow: true,
  tag: '',
};

export const Component: ComponentDecorator = ({
  shadow = true,
  tag = '',
} = DEFAULT_COMPONENT) => {
  return <C extends Function>(Component: C): C | void => {
    if (!tag) {
      // throwInvalidComponentTagError()
    }

    customElements.define(tag, Component as WebComponent<C>);

    if (shadow) {
      // TODO
    }
  };
};
