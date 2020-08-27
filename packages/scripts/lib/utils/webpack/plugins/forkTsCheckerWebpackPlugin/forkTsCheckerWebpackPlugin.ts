import { Plugin } from 'webpack';
import resolve from 'resolve';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import typescriptFormatter from 'react-dev-utils/typescriptFormatter';
import {
	PATHS_APP_NODE_MODULES,
	PATHS_APP_TS_CONFIG,
	isDevelopment,
	isProduction,
} from '../../../enums';

interface ProcessVersionsWithPnP extends NodeJS.ProcessVersions {
	pnp?: boolean;
}

export const forkTsCheckerWebpackPlugin = (): Plugin =>
	new ForkTsCheckerWebpackPlugin({
		async: isDevelopment(),
		checkSyntacticErrors: true,
		formatter: isProduction() ? typescriptFormatter : undefined,
		reportFiles: [
			'../**/src/**/*.{ts,tsx}',
			'**/src/**/*.{ts,tsx}',
			'!**/src/**/__tests__/**',
			'!**/src/**/?(*.)(spec|test).*',
			'!**/src/setupProxy.*',
			'!**/src/setupTests.*',
		],
		resolveModuleNameModule: (process.versions as ProcessVersionsWithPnP).pnp
			? `${__dirname}/pnpTs.js`
			: undefined,
		resolveTypeReferenceDirectiveModule: (process.versions as ProcessVersionsWithPnP).pnp
			? `${__dirname}/pnpTs.js`
			: undefined,
		silent: true,
		tsconfig: PATHS_APP_TS_CONFIG,
		typescript: resolve.sync('typescript', {
			basedir: PATHS_APP_NODE_MODULES,
		}),
	});
