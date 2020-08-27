export interface WebpackEnv {
	stringified: {
		'process.env': NodeJS.ProcessEnv;
	};
	raw: Record<string, string>;
}
