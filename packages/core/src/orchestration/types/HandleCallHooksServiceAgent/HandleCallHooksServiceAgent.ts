import { Service } from '../../../services';

export interface HandleCallHooksServiceAgent {
  readonly [key: string]: ReadonlyArray<Service>;
}
