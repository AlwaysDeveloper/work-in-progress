export default class AuthenticationError extends Error {
	constructor(message = "Unauthorized!") {
		super(message);
		this.name = "AuthenticationError";
		this.statusCode = 401;
	}
}