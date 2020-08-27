export const test = async (): Promise<void> => {
	try {
		console.log('Testing...');
	} catch (err) {
		console.error(err instanceof Error ? err : new Error(err));
	}
};
