import { Config } from '@jest/types';
import { PackageJson } from '../PackageJson';

export interface PackageJsonWithJest extends PackageJson {
  readonly jest: Config.Argv;
}

export const isPackageJsonWithJest = (value: unknown): value is PackageJsonWithJest => {
  return (
    typeof value === 'object' &&
    value !== null &&
    'jest' in value &&
    typeof (value as Partial<PackageJsonWithJest>).jest === 'object' &&
    Object.keys((value as PackageJsonWithJest).jest).length > 0
  );
};
