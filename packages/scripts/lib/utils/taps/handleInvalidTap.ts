export const handleInvalidTap = (): void => {
	if (process.stdout.isTTY) {
		console.clear();
	}

	console.log('Compiling...');
};
