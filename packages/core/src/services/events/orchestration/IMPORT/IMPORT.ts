import { AppFrameElement } from '../../../components';
import { ServiceOrchestrationEvents } from '../../../enums';
import { ImportFn } from '../../../types';
import { AsyncDetail, dispatchFrom } from '../../../../utils';
import { defaultImport } from '../../../functions';

export type ImportEvent = CustomEvent<AsyncDetail<ImportEventDetail>>;

export interface ImportEventDetail {
  readonly path: string;
  readonly frame: AppFrameElement;
  readonly importModule: ImportFn;
}

export const $import = async (
  path: string,
  frame: AppFrameElement,
): Promise<System.Module> => {
  const dispatch = dispatchFrom(frame.name);

  return dispatch<ImportEventDetail, System.Module>(
    ServiceOrchestrationEvents.IMPORT,
    {
      path,
      frame,
      importModule: defaultImport,
    },
  );
};

export const $importFrom = (frame: AppFrameElement) => async (
  path: string,
): Promise<System.Module> => {
  return $import(path, frame);
};

export const isImportEvent = (value: unknown): value is ImportEvent => {
  return (
    typeof value === 'object' &&
    value !== null &&
    'type' in value &&
    typeof (value as Partial<ImportEvent>).type === 'string' &&
    (value as Partial<ImportEvent>).type!.includes(
      ServiceOrchestrationEvents.IMPORT,
    )
  );
};
