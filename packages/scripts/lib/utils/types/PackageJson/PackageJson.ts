export interface PackageJson extends Object {
	readonly name: string;
	readonly version?: string;
	readonly description?: string;
	readonly keywords?: Array<string>;
	readonly homepage?: string;
	readonly bugs?: string | PackageJsonBugs;
	readonly license?: string;
	readonly author?: string | PackageJsonAuthor;
	readonly contributors?: Array<string | PackageJsonAuthor>;
	readonly files?: Array<string>;
	readonly main?: string;
	readonly bin?: string | PackageJsonBinMap;
	readonly man?: string | Array<string>;
	readonly directories?: PackageJsonDirectories;
	readonly repository?: string | PackageJsonRepository;
	readonly scripts?: PackageJsonScriptsMap;
	readonly config?: PackageJsonConfig;
	readonly dependencies?: PackageJsonDependencyMap;
	readonly devDependencies?: PackageJsonDependencyMap;
	readonly peerDependencies?: PackageJsonDependencyMap;
	readonly optionalDependencies?: PackageJsonDependencyMap;
	readonly bundledDependencies?: Array<string>;
	readonly engines?: PackageJsonEngines;
	readonly os?: Array<string>;
	readonly cpu?: Array<string>;
	readonly preferGlobal?: boolean;
	readonly private?: boolean;
	readonly publishConfig?: PackageJsonPublishConfig;
}

export interface PackageJsonPublishConfig {
	registry?: string;
}

export interface PackageJsonAuthor {
	name: string;
	email?: string;
	homepage?: string;
}

export interface PackageJsonBinMap {
	[commandName: string]: string;
}

export interface PackageJsonScriptsMap {
	[scriptName: string]: string;
}

export interface PackageJsonDependencyMap {
	[dependencyName: string]: string;
}

export interface PackageJsonBugs {
	email: string;
	url: string;
}

export interface PackageJsonRepository {
	type: string;
	url: string;
}

export interface PackageJsonConfig<T = Record<string, unknown>> {
	name?: string;
	config?: T;
}

export interface PackageJsonDirectories {
	lib?: string;
	bin?: string;
	man?: string;
	doc?: string;
	example?: string;
}

export interface PackageJsonEngines {
	node?: string;
	npm?: string;
}

export const isPackageJson = (value: unknown): value is PackageJson => {
	return (
		typeof value === 'object' &&
		value !== null &&
		'name' in value &&
		typeof (value as Partial<PackageJson>).name === 'string' &&
		(value as PackageJson).name.length > 0
	);
};
