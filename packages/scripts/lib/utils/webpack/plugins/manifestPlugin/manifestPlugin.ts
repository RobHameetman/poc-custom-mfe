import { Plugin } from 'webpack';
import ManifestPlugin from 'webpack-manifest-plugin';

export interface FilesManifest {
	[key: string]: string;
}

export interface AssetManifest {
	entrypoints: Array<string>;
	files: FilesManifest;
}

export const manifestPlugin = (PUBLIC_PATH: string): Plugin =>
	new ManifestPlugin({
		fileName: 'asset-manifest.json',
		generate: (seed, files, entrypoints): AssetManifest => {
			const manifestFiles = files.reduce<FilesManifest>((manifest, { name, path }) => {
				if (name !== null) {
					/* eslint-disable-next-line no-param-reassign */
					manifest[name] = path;
				}

				return manifest;
			}, seed as FilesManifest);

			const entrypointFiles = entrypoints.main.filter(
				(fileName: string) => !fileName.endsWith('.map'),
			);

			return {
				entrypoints: entrypointFiles,
				files: manifestFiles,
			};
		},
		publicPath: PUBLIC_PATH,
	});
