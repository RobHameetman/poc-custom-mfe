import { AppFrameElement } from '../../../components';
import { ServiceOrchestrationEvents } from '../../../enums';
import { AsyncDetail, dispatchFrom } from '../../../../utils';

export type ImportErrorEvent = CustomEvent<AsyncDetail<ImportErrorEventDetail>>;

export interface ImportErrorEventDetail {
  readonly error: Error;
  readonly frame: AppFrameElement;
}

export const importError = async (
  error: Error,
  frame: AppFrameElement,
): Promise<void> => {
  const dispatch = dispatchFrom(frame.name);

  return dispatch<ImportErrorEventDetail>(
    ServiceOrchestrationEvents.IMPORT_ERROR,
    { error, frame },
  );
};

export const importErrorFrom = (frame: AppFrameElement) => async (
  error: Error,
): Promise<void> => {
  return importError(error, frame);
};

export const isImportErrorEvent = (
  value: unknown,
): value is ImportErrorEvent => {
  return (
    typeof value === 'object' &&
    value !== null &&
    'type' in value &&
    typeof (value as Partial<ImportErrorEvent>).type === 'string' &&
    (value as Partial<ImportErrorEvent>).type!.includes(
      ServiceOrchestrationEvents.IMPORT_ERROR,
    )
  );
};
