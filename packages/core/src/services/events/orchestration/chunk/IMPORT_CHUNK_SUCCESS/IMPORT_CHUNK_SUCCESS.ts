import { ServiceOrchestrationEvents } from '../../../../enums';
import { dispatchFrom } from '../../../../../utils';

export type ImportChunkSuccessEvent = CustomEvent<string>;

export const importChunkSuccess = (chunk: string, service: string) => {
  const dispatch = dispatchFrom(service);

  dispatch(ServiceOrchestrationEvents.IMPORT_CHUNK_SUCCESS, chunk);
};

export const importChunkSuccessFrom = (service: string) => (chunk: string) => {
  importChunkSuccess(chunk, service);
};

export const isImportChunkSuccessEvent = (
  value: unknown,
): value is ImportChunkSuccessEvent => {
  return (
    typeof value === 'object' &&
    value !== null &&
    'type' in value &&
    typeof (value as Partial<ImportChunkSuccessEvent>).type === 'string' &&
    (value as Partial<ImportChunkSuccessEvent>).type!.includes(
      ServiceOrchestrationEvents.IMPORT_CHUNK_SUCCESS,
    )
  );
};
