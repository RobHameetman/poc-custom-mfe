import { ServiceOrchestrationEvents } from '../../../../enums';
import { dispatchFrom } from '../../../../../utils';

export type ImportManifestErrorEvent = CustomEvent<string>;

export const importManifestError = (manifest: string, service: string) => {
  const dispatch = dispatchFrom(service);

  dispatch(ServiceOrchestrationEvents.IMPORT_MANIFEST_ERROR, manifest);
};

export const importManifestErrorFrom = (service: string) => (manifest: string) => {
  importManifestError(manifest, service);
};

export const isImportManifestErrorEvent = (
  value: unknown,
): value is ImportManifestErrorEvent => {
  return (
    typeof value === 'object' &&
    value !== null &&
    'type' in value &&
    typeof (value as Partial<ImportManifestErrorEvent>).type === 'string' &&
    (value as Partial<ImportManifestErrorEvent>).type!.includes(
      ServiceOrchestrationEvents.IMPORT_MANIFEST_ERROR,
    )
  );
};
