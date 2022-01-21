export interface ImportedModule {
  boot(): void;
  mount(): void;
  unmount(): void;
}

export const isImportedModule = (value: unknown): value is ImportedModule => {
  return (
    typeof value === 'object' &&
    value !== null &&
    'boot' in value &&
    typeof (value as Partial<ImportedModule>).boot === 'function' &&
    'mount' in value &&
    typeof (value as Partial<ImportedModule>).mount === 'function' &&
    'unmount' in value &&
    typeof (value as Partial<ImportedModule>).unmount === 'function'
  );
};
