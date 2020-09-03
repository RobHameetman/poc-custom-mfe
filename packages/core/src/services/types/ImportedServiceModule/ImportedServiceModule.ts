export interface ImportedServiceModule {
  boot(): void;
  mount(): void;
  unmount(): void;
}

export const isImportedServiceModule = (value: unknown): value is ImportedServiceModule => {
  return (
    typeof value === 'object' &&
    value !== null &&
    'boot' in value &&
    typeof (value as Partial<ImportedServiceModule>).boot === 'function' &&
    'mount' in value &&
    typeof (value as Partial<ImportedServiceModule>).mount === 'function' &&
    'unmount' in value &&
    typeof (value as Partial<ImportedServiceModule>).unmount === 'function'
  );
};
