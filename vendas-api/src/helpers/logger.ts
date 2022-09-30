class Logger {
	public info(info: any) {
		const datetime = new Date().toLocaleString('en-US', {
			dateStyle: 'medium',
			timeStyle: 'medium',
			hour12: false,
		});

		console.log(`[${datetime}]`, info);
	}

	public error(error: any) {
		const datetime = new Date().toLocaleString('en-US', {
			dateStyle: 'medium',
			timeStyle: 'medium',
			hour12: false,
		});

		console.error(`[${datetime}]`, error);
	}
}

export default new Logger();
