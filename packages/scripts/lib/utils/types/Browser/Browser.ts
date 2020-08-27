import open from 'open';

export class Browser {
	url = '';

	async open(host: string, port: string | number): Promise<void> {
		return new Promise((resolve, reject) => {
			this.url = `${host}:${port}/`;

			open(this.url);
		});
	}
}
