/* eslint-disable no-undef */
export default class Logger {
	logLevel = {
		info: "INFO",
		warn: "WARN",
		error: "ERROR",
		debug: "DEBUG"
	};
	constructor() {}

	__init(Class) { 
		this.origin = Class.constructor.name;
		return this;
	}

	info(message) {
		this.print({message, level: this.logLevel.info});
	}

	warn(message) {
		this.print({message, level: this.logLevel.warn});
	}

	debug(message, object) {
		this.print({message: `${message}, JSON=${JSON.stringify(object)}`, level: this.logLevel.debug});
	}

	error(message, error) {
		this.print({message: `${message}, Error=${JSON.stringify(error)}`, level: this.logLevel.error});
	}

	print(messagePackage) {
		process.stdout.write(`${this.origin}|${messagePackage.level}|${messagePackage.message}`);
	}
}