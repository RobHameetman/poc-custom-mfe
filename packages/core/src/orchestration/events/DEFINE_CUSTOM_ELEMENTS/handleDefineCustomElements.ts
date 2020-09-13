import {
  DefineCustomElementsEvent,
  DefineCustomElementsEventDetail,
} from './DEFINE_CUSTOM_ELEMENTS';
import { logEvent } from '../../../utils';

export const handleDefineCustomElements = (e: DefineCustomElementsEvent) => {
  logEvent(e);

  const { detail } = e;

  if (Array.isArray(detail)) {
    detail.forEach(({ $element, options, tag }) =>
      window.customElements.define(tag, $element, options),
    );
  } else {
    const {
      $element,
      options,
      tag,
    } = detail as DefineCustomElementsEventDetail;

    window.customElements.define(tag, $element, options);
  }
};
