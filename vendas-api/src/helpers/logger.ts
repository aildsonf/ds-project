class Logger {
	private readonly datetime: string;

	constructor() {
		this.datetime = new Date().toLocaleString('en-US', {dateStyle: 'medium', timeStyle: 'medium', hour12: false});
	}

	public info(info: any) {
		console.log(`[${this.datetime}]`, info);
	}

	public error(error: any) {
		console.error(`[${this.datetime}]`, error);
	}
}

export default new Logger();
