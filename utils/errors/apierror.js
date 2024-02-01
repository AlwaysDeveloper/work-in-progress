export default class ApiError extends Error {
	constructor(statusCode = 500, message, name = "ApiError",details = null) {
		super(message);
		this.name = name;
		this.statusCode = statusCode;
		this.details = details;
	}
}