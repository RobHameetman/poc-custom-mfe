export enum WebpackBuildModes {
	development = 'development',
	production = 'production',
	none = 'none',
}

export type WebpackBuildMode = keyof typeof WebpackBuildModes;

export const isWebpackBuildMode = (
	value: unknown = process.env.NODE_ENV,
): value is WebpackBuildMode => {
	return (
		typeof value === 'string' &&
		(value === WebpackBuildModes.production || value === WebpackBuildModes.development)
	);
};
