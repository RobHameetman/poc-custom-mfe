import { AppFrameElement } from '../../../services';

export interface HandleCallHooksServiceAgent {
  readonly [key: string]: ReadonlyArray<AppFrameElement>;
}
