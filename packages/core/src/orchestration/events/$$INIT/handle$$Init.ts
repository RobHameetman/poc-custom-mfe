import { $$InitEvent } from './$$INIT';
import { defineCustomElements } from '../DEFINE_CUSTOM_ELEMENTS';
import { AppEntrypointElement } from '../../components';
import { AppRouterElement, AppRouteElement } from '../../../routing';
import { logEvent } from '../../../utils';

export const handle$$Init = (e: $$InitEvent) => {
  if (!AppEntrypointElement.$$initConfirmed) {
    logEvent(e);

    if (e.detail) {
      const { resolve } = e.detail;

      defineCustomElements([
        { $element: AppEntrypointElement, tag: 'app-entrypoint' },
        { $element: AppRouterElement, tag: 'app-router' },
        { $element: AppRouteElement, tag: 'app-route' },
      ]);

      AppEntrypointElement.confirm$$Init();

      resolve();
    }
  }
};
