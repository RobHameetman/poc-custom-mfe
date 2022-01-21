import { $$InitEvent } from './$$INIT';
import { defineCustomElements } from '../DEFINE_CUSTOM_ELEMENTS';
import { AppContainerElement } from '../../components';
import { AppRouterElement, AppRouteElement } from '../../../routing';
import { AppFrameElement } from '../../../services';

export const handle$$Init = (e: $$InitEvent) => {
  if (!AppContainerElement.$$initConfirmed) {
    if (e.detail) {
      const { resolve } = e.detail;

      defineCustomElements([
        { $element: AppContainerElement, tag: 'app-container' },
        { $element: AppRouterElement, tag: 'app-router' },
        { $element: AppRouteElement, tag: 'app-route' },
        { $element: AppFrameElement, tag: 'app-frame' },
      ]);

      AppContainerElement.confirm$$Init();

      resolve();
    }
  }
};
