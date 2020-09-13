import { handleDefineCustomElements } from './handleDefineCustomElements';
import { Namespaces, OrchestrationEvents } from '../../enums';
import { CustomElementConstructor } from '../../../rendering';
import { dispatchOnce } from '../../../utils';

export const DEFINE_CUSTOM_ELEMENTS = `${Namespaces.App}:${OrchestrationEvents.DEFINE_CUSTOM_ELEMENTS}`;
export type DEFINE_CUSTOM_ELEMENTS = typeof DEFINE_CUSTOM_ELEMENTS;

export interface DefineCustomElementsEvent
  extends CustomEvent<
    | DefineCustomElementsEventDetail
    | ReadonlyArray<DefineCustomElementsEventDetail>
  > {
  type: DEFINE_CUSTOM_ELEMENTS;
}

export interface DefineCustomElementsEventDetail {
  readonly $element: CustomElementConstructor;
  readonly options?: ElementDefinitionOptions;
  readonly tag: string;
}

export const defineCustomElements = (
  detail:
    | DefineCustomElementsEventDetail
    | ReadonlyArray<DefineCustomElementsEventDetail>,
): void => {
  dispatchOnce(
    DEFINE_CUSTOM_ELEMENTS,
    handleDefineCustomElements as EventListenerOrEventListenerObject,
    detail,
  );
};

export const isDefineCustomElementsEvent = (
  value: unknown,
): value is DefineCustomElementsEvent => {
  return (
    typeof value === 'object' &&
    value !== null &&
    'type' in value &&
    (value as Partial<DefineCustomElementsEvent>).type ===
      DEFINE_CUSTOM_ELEMENTS
  );
};
