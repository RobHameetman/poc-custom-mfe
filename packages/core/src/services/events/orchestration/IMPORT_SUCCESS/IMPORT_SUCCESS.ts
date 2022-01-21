import { AppFrameElement } from '../../../components';
import { ServiceOrchestrationEvents } from '../../../enums';
import { AsyncDetail, ResolveFn, dispatchFrom } from '../../../../utils';

export type ImportSuccessEvent = CustomEvent<
  AsyncDetail<ImportSuccessEventDetail>
>;

export interface ImportSuccessEventDetail {
  readonly frame: AppFrameElement;
  readonly imported: System.Module;
  readonly resolve: ResolveFn;
}

export const importSuccess = async (
  frame: AppFrameElement,
  imported: System.Module,
  resolve: ResolveFn,
): Promise<System.Module> => {
  const dispatch = dispatchFrom(frame.name);

  return dispatch<ImportSuccessEventDetail, System.Module>(
    ServiceOrchestrationEvents.IMPORT_SUCCESS,
    {
      frame,
      imported,
      resolve,
    },
  );
};

export const importSuccessFrom = (frame: AppFrameElement) => async (
  imported: System.Module,
  resolve: ResolveFn,
): Promise<System.Module> => {
  return importSuccess(frame, imported, resolve);
};

export const isImportSuccessEvent = (
  value: unknown,
): value is ImportSuccessEvent => {
  return (
    typeof value === 'object' &&
    value !== null &&
    'type' in value &&
    typeof (value as Partial<ImportSuccessEvent>).type === 'string' &&
    (value as Partial<ImportSuccessEvent>).type!.includes(
      ServiceOrchestrationEvents.IMPORT_SUCCESS,
    )
  );
};
