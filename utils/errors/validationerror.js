export default class ValidationError extends Error {
	constructor(errors) {
		super("Validation Error");
		this.name = "ValidationError";
		this.statusCode = 400;
		this.details = errors;
	}
}