import {
  CustomElementAgent,
  DefineCustomElementsEvent,
} from './DEFINE_CUSTOM_ELEMENTS';

export const handleDefineCustomElements = (e: DefineCustomElementsEvent) => {
  const { detail } = e;
  const { elements } = detail;

  if (Array.isArray(elements)) {
    elements.forEach(({ $element, options, tag }) =>
      window.customElements.define(tag, $element, options),
    );
  } else {
    const { $element, options, tag } = elements as CustomElementAgent;

    window.customElements.define(tag, $element, options);
  }
};
