/* eslint-disable no-undef */
import ValidationError from "../errors/validationerror";
import ApiError from "../errors/apierror";
import AuthenticationError from "../errors/authenticationerror";

// eslint-disable-next-line no-unused-vars
export default function ErrorHandler(error, req, res, next) {
	let status = error.statusCode || 500;
	let errorResponse;
	if (error instanceof ValidationError) {
		errorResponse = {
			type: error.name,
			validations: error.details,
			message: error.message
		};
	}
	else if (error instanceof ApiError) {
		errorResponse = {
			type: error.name,
			message: error.message,
			error: error.errorMessage
		};
	} else if (error instanceof AuthenticationError) {
		errorResponse = {
			type: error.name,
			message: error.message
		};
	} else {
		errorResponse = {
			type: "internal_server_error",
			message: error.message,
			error: ["dev", "local"].includes(process.env.NODE_ENV) ? error.error.stack : undefined
		};
	}
	res.status(status).json(errorResponse);
}