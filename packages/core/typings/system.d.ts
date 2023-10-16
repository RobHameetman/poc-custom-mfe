declare module 'systemjs' {
  export const System: {
    import: System.ImportFn;
    register(dependencies: string[], declare: System.DeclareFn): void;
    register(
      name: string,
      dependencies: string[],
      declare: System.DeclareFn,
    ): void;
    resolve(moduleId: string, parentUrl?: string): string;
    delete(moduleId: string): false | System.UpdateModuleFn;
    get(moduleId: string): System.Module | null;
    get<T>(moduleId: string): T | null;
    has(moduleId: string): boolean;
    set(moduleId: string, module: System.Module): void;
    entries(): Iterable<[string, System.Module]>;
  };

  export namespace System {
    type ImportFn = <T extends Module>(
      moduleId: string,
      parentUrl?: string,
    ) => Promise<T>;
    type DeclareFn = (_export: ExportFn, _context: Context) => Declare;

    interface Declare {
      setters?: SetterFn[];
      execute?(): unknown;
    }

    type SetterFn = (moduleValue: Module) => unknown;
    type ExecuteFn = () => unknown;

    interface ExportFn {
      (exportName: string, value: unknown): void;
      (exports: object): void;
    }

    type UpdateModuleFn = () => void;
    type GetFn = GetFnModule | GetFnGeneric;
    type GetFnModule = (moduleId: string) => Module;
    type GetFnGeneric = <T>(moduleId: string) => T;

    interface Context {
      import: ImportFn;
      meta: {
        url: string;
      };
    }

    interface Module {
      default?: unknown;
      [exportName: string]: unknown;
    }
  }
}
