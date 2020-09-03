import { ServiceOrchestrationEvents } from '../../../../enums';
import { dispatchFrom } from '../../../../../utils';

export type ImportChunkEvent = CustomEvent<string>;

export const importChunk = (chunk: string, service: string) => {
  const dispatch = dispatchFrom(service);

  dispatch(ServiceOrchestrationEvents.IMPORT_CHUNK, chunk);
};

export const importChunkFrom = (service: string) => (chunk: string) => {
  importChunk(chunk, service);
};

export const isImportChunkEvent = (
  value: unknown,
): value is ImportChunkEvent => {
  return (
    typeof value === 'object' &&
    value !== null &&
    'type' in value &&
    typeof (value as Partial<ImportChunkEvent>).type === 'string' &&
    (value as Partial<ImportChunkEvent>).type!.includes(
      ServiceOrchestrationEvents.IMPORT_CHUNK,
    )
  );
};
