export const debug = async (): Promise<void> => {
	try {
		console.log('Running the application in debug mode...');
	} catch (err) {
		console.error(err instanceof Error ? err : new Error(err));
	}
};
