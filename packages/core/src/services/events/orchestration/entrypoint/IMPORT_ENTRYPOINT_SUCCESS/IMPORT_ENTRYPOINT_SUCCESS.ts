import { ServiceOrchestrationEvents } from '../../../../enums';
import { dispatchFrom } from '../../../../../utils';

export type ImportEntrypointSuccessEvent = CustomEvent<string>;

export const importEntrypointSuccess = (
  entrypoint: string,
  service: string,
) => {
  const dispatch = dispatchFrom(service);

  dispatch(ServiceOrchestrationEvents.IMPORT_ENTRYPOINT_SUCCESS, entrypoint);
};

export const importEntrypointSuccessFrom = (service: string) => (
  entrypoint: string,
) => {
  importEntrypointSuccess(entrypoint, service);
};

export const isImportEntrypointSuccessEvent = (
  value: unknown,
): value is ImportEntrypointSuccessEvent => {
  return (
    typeof value === 'object' &&
    value !== null &&
    'type' in value &&
    typeof (value as Partial<ImportEntrypointSuccessEvent>).type === 'string' &&
    (value as Partial<ImportEntrypointSuccessEvent>).type!.includes(
      ServiceOrchestrationEvents.IMPORT_ENTRYPOINT_SUCCESS,
    )
  );
};
