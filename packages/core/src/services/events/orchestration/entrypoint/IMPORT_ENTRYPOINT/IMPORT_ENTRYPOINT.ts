import { ServiceOrchestrationEvents } from '../../../../enums';
import { dispatchFrom } from '../../../../../utils';

export type ImportEntrypointEvent = CustomEvent<string>;

export const importEntrypoint = (entrypoint: string, service: string) => {
  const dispatch = dispatchFrom(service);

  dispatch(ServiceOrchestrationEvents.IMPORT_ENTRYPOINT, entrypoint);
};

export const importEntrypointFrom = (service: string) => (entrypoint: string) => {
  importEntrypoint(entrypoint, service);
};

export const isImportEntrypointEvent = (
  value: unknown,
): value is ImportEntrypointEvent => {
  return (
    typeof value === 'object' &&
    value !== null &&
    'type' in value &&
    typeof (value as Partial<ImportEntrypointEvent>).type === 'string' &&
    (value as Partial<ImportEntrypointEvent>).type!.includes(
      ServiceOrchestrationEvents.IMPORT_ENTRYPOINT,
    )
  );
};
