import { ServiceOrchestrationEvents } from '../../../../enums';
import { dispatchFrom } from '../../../../../utils';

export type ImportEntrypointErrorEvent = CustomEvent<string>;

export const importEntrypointError = (entrypoint: string, service: string) => {
  const dispatch = dispatchFrom(service);

  dispatch(ServiceOrchestrationEvents.IMPORT_ENTRYPOINT_ERROR, entrypoint);
};

export const importEntrypointErrorFrom = (service: string) => (entrypoint: string) => {
  importEntrypointError(entrypoint, service);
};

export const isImportEntrypointErrorEvent = (
  value: unknown,
): value is ImportEntrypointErrorEvent => {
  return (
    typeof value === 'object' &&
    value !== null &&
    'type' in value &&
    typeof (value as Partial<ImportEntrypointErrorEvent>).type === 'string' &&
    (value as Partial<ImportEntrypointErrorEvent>).type!.includes(
      ServiceOrchestrationEvents.IMPORT_ENTRYPOINT_ERROR,
    )
  );
};
