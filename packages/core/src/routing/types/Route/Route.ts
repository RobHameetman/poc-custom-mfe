import { AppRouterElement } from '../../components';
import { AppFrameElement } from '../../../services';

export interface Route {
  /**
   * The path that the router uses.
   */
  path: string;
  /**
   * Entrypoint of the routed client app
   */
  frames: ReadonlyArray<AppFrameElement>;

  /**
   * id of the route slot element
   */
  slotId: string;

  /**
   * A copy of the router instance
   */
  router: AppRouterElement;
}