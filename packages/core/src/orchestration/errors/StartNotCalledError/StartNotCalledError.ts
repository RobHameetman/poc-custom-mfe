import {
  Namespaces,
  OrchestrationErrorCodes,
  OrchestrationErrors,
} from '../../enums';
import { StandardError, dispatch } from '../../../utils';

export const ERROR_START_NOT_CALLED = `${Namespaces.App}:${OrchestrationErrors.StartNotCalled}`;
export type ERROR_START_NOT_CALLED = typeof ERROR_START_NOT_CALLED;

export class StartNotCalledError
  extends Error
  implements
    StandardError<
      ERROR_START_NOT_CALLED,
      OrchestrationErrorCodes.StartNotCalled
    > {
  public static readonly message = ``;

  public readonly code = OrchestrationErrorCodes.StartNotCalled;
  public readonly name = ERROR_START_NOT_CALLED;

  constructor(public readonly message = StartNotCalledError.message) {
    super(message);
  }
}

export interface StartNotCalledErrorEvent extends CustomEvent {
  readonly type: ERROR_START_NOT_CALLED;
}

export const dispatchStartNotCalledError = (): void => {
  dispatch(ERROR_START_NOT_CALLED, null);
};

export const isStartNotCalledErrorEvent = (
  value: unknown,
): value is StartNotCalledErrorEvent => {
  return (
    typeof value === 'object' &&
    value !== null &&
    'type' in value &&
    (value as Partial<StartNotCalledErrorEvent>).type === ERROR_START_NOT_CALLED
  );
};
