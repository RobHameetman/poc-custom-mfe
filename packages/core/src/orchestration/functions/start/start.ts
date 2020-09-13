import { getMountNode } from '../getMountNode';
import { isInBrowser } from '../isInBrowser';
import { $$init } from '../../events';
import { FC, Props, render } from '../../../rendering';

export const start = async <P extends Props = Props>(
  App: FC<P>,
  props?: P,
): Promise<void> => {
  return new Promise(async (resolve, reject) => {
    await $$init();

    if (isInBrowser()) {
      // callHooks();
      render<P>(getMountNode(), App, props);
    }

    return resolve();
  });
};
