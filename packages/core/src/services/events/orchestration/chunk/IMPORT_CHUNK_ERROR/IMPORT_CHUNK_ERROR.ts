import { ServiceOrchestrationEvents } from '../../../../enums';
import { dispatchFrom } from '../../../../../utils';

export type ImportChunkErrorEvent = CustomEvent<string>;

export const importChunkError = (chunk: string, service: string) => {
  const dispatch = dispatchFrom(service);

  dispatch(ServiceOrchestrationEvents.IMPORT_CHUNK_ERROR, chunk);
};

export const importChunkErrorFrom = (service: string) => (chunk: string) => {
  importChunkError(chunk, service);
};

export const isImportChunkErrorEvent = (
  value: unknown,
): value is ImportChunkErrorEvent => {
  return (
    typeof value === 'object' &&
    value !== null &&
    'type' in value &&
    typeof (value as Partial<ImportChunkErrorEvent>).type === 'string' &&
    (value as Partial<ImportChunkErrorEvent>).type!.includes(
      ServiceOrchestrationEvents.IMPORT_CHUNK_ERROR,
    )
  );
};
