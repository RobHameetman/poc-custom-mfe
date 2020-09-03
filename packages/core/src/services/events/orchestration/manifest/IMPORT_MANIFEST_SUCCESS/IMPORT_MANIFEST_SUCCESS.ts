import { ServiceOrchestrationEvents } from '../../../../enums';
import { Manifest } from '../../../../types';
import { dispatchFrom } from '../../../../../utils';

export type ImportManifestSuccessEvent = CustomEvent<Manifest>;

export const importManifestSuccess = (service: string, manifest: Manifest) => {
  const dispatch = dispatchFrom(service);

  dispatch(ServiceOrchestrationEvents.IMPORT_MANIFEST_SUCCESS, manifest);
};

export const importManifestSuccessFrom = (service: string) => (manifest: Manifest) => {
  importManifestSuccess(service, manifest);
};

export const isImportManifestSuccessEvent = (
  value: unknown,
): value is ImportManifestSuccessEvent => {
  return (
    typeof value === 'object' &&
    value !== null &&
    'type' in value &&
    typeof (value as Partial<ImportManifestSuccessEvent>).type === 'string' &&
    (value as Partial<ImportManifestSuccessEvent>).type!.includes(
      ServiceOrchestrationEvents.IMPORT_MANIFEST_SUCCESS,
    )
  );
};
