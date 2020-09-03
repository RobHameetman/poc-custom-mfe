import { ServiceOrchestrationEvents } from '../../../../enums';
import { dispatchFrom } from '../../../../../utils';

export type ImportManifestEvent = CustomEvent<string>;

export const importManifest = (manifest: string, service: string) => {
  const dispatch = dispatchFrom(service);

  dispatch(ServiceOrchestrationEvents.IMPORT_MANIFEST, manifest);
};

export const importManifestFrom = (service: string) => (manifest: string) => {
  importManifest(manifest, service);
};

export const isImportManifestEvent = (
  value: unknown,
): value is ImportManifestEvent => {
  return (
    typeof value === 'object' &&
    value !== null &&
    'type' in value &&
    typeof (value as Partial<ImportManifestEvent>).type === 'string' &&
    (value as Partial<ImportManifestEvent>).type!.includes(
      ServiceOrchestrationEvents.IMPORT_MANIFEST,
    )
  );
};
