import { PATHS_APP_PACKAGE_JSON } from '../../enums';
import { PackageJson, isPackageJson } from '../../types';

let packageJson: PackageJson | undefined;

export const importPackageJson = async (): Promise<PackageJson | undefined> => {
	if (!packageJson) {
		const imported = await import(PATHS_APP_PACKAGE_JSON);

		packageJson = isPackageJson(imported) ? imported : undefined;
	}

	return packageJson;
};
