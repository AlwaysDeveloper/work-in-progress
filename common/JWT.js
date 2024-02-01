import JsonWebToken from "jsonwebtoken";
import AuthenticationError from "../utils/errors/authenticationerror";

export function JWTSign(payload) {
	return JsonWebToken.sign(
		payload,
		APP_CONFIG.jwt.secret,
		{
			expiresIn: APP_CONFIG.jwt.expire
		}
	);
}

export function JWTVerify(token) {
	return new Promise((resolve, reject) => {
		JsonWebToken.verify(
			token,
			APP_CONFIG.jwt.secret,
			(error, decoded) => {
				if(error) {
					reject(new AuthenticationError("Unauthorized"));
				}
				resolve(decoded);
			}
		);
	});
}