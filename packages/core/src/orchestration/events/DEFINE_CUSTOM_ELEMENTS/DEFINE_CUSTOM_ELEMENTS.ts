import { handleDefineCustomElements } from './handleDefineCustomElements';
import { Namespaces, OrchestrationEvents } from '../../enums';
import { CustomElementConstructor } from '../../types';
import { AsyncDetail, dispatchOnce } from '../../../utils';

export const DEFINE_CUSTOM_ELEMENTS = `${Namespaces.App}:${OrchestrationEvents.DEFINE_CUSTOM_ELEMENTS}`;
export type DEFINE_CUSTOM_ELEMENTS = typeof DEFINE_CUSTOM_ELEMENTS;

export interface DefineCustomElementsEvent
  extends CustomEvent<AsyncDetail<DefineCustomElementsEventDetail>> {
  readonly type: DEFINE_CUSTOM_ELEMENTS;
}

export interface DefineCustomElementsEventDetail {
  readonly elements: CustomElementAgent | ReadonlyArray<CustomElementAgent>;
}

export interface CustomElementAgent {
  readonly $element: CustomElementConstructor;
  readonly options?: ElementDefinitionOptions;
  readonly tag: string;
}

export const defineCustomElements = async (
  elements: CustomElementAgent | ReadonlyArray<CustomElementAgent>,
): Promise<void> => {
  return dispatchOnce<DefineCustomElementsEventDetail>(
    DEFINE_CUSTOM_ELEMENTS,
    handleDefineCustomElements as EventListenerOrEventListenerObject,
    { elements },
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
