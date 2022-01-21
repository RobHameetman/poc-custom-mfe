import { CompilerOptions, TranspileOptions } from 'typescript';
import { PATHS_APP_TS_CONFIG } from '../../enums';

let tsconfigJson: CompilerOptions | undefined;

export const importTsconfigJson = async (): Promise<CompilerOptions | undefined> => {
  if (!tsconfigJson) {
    const tsConfig = await import(PATHS_APP_TS_CONFIG);

    tsconfigJson = (tsConfig?.default as TranspileOptions)?.compilerOptions ?? undefined;
  }

  return tsconfigJson;
};
