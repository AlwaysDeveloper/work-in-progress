/* eslint-disable no-undef */
import ValidationError from "../utils/errors/validationerror";
import ApiError from "../utils/errors/apierror";
import AuthenticationError from "../utils/errors/authenticationerror";

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
			type: error.message,
			message: error.message
		};
	} else {
		errorResponse = {
			type: "General Error",
			message: error.message,
			error: ["dev"].includes(process.env.NODE_ENV) ? error.stack : undefined
		};
	}
	res.status(status).json(errorResponse);
}