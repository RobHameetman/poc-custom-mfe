import { Loader } from 'webpack';

export const urlLoader = (): Loader => ({
	loader: require.resolve('url-loader'),
	options: {},
});
