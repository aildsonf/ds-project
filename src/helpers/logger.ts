class Logger {
	private datetime: string;

	constructor() {
		this.datetime = new Date().toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'medium', hour12: false });
	}

	public info(info: any) {
		return console.log(`[${this.datetime}]`, info);
	}

	public error(error: any) {
		return console.error(`[${this.datetime}]`, error);
	}
}

export default new Logger();
