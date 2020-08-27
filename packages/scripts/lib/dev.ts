export const dev = async (): Promise<void> => {
	try {
		console.log('Running the application in development mode...');
	} catch (err) {
		console.error(err instanceof Error ? err : new Error(err));
	}
};
