export interface PropConfig {
  /**
   * The name of the associated DOM attribute.
   * Stencil uses different heuristics to determine the default name of the attribute,
   * but using this property, you can override the default behaviour.
   */
  readonly attribute?: string;

  /**
   * A Prop is _by default_ immutable from inside the component logic.
   * Once a value is set by a user, the component cannot update it internally.
   * However, it's possible to explicitly allow a Prop to be mutated from inside the component,
   * by setting this `mutable` option to `true`.
   */
  readonly mutable?: boolean;

  /**
   * In some cases it may be useful to keep a Prop out of sync with an attribute.
   * In this case you can set the `reflect` option to `false`, since it defaults to `true`:
   */
  reflect?: boolean;
}

export type PropDecorator = (config?: PropConfig) => PropertyDecorator;

const DEFAULT_CONFIG: PropConfig = {
  attribute: undefined,
  mutable: false,
  reflect: true,
};

export const Prop: PropDecorator = ({
  attribute = undefined,
  mutable = false,
  reflect = true,
} = DEFAULT_CONFIG) => {
  return <C>(Component: C, prop: string | symbol): C | void => {
    
  };
};
