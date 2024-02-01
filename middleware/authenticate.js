import { JWTVerify } from "../common/JWT";
import AuthenticationError from "../utils/errors/authenticationerror";

function extractToken(token) {
	if (!token || !token.startsWith("Bearer")) {
		throw new AuthenticationError("Invalid authorization token!");
	}
	return token.split("Bearer ")[0];
}

async function AuthenticateToken(req, res, next) {
	const token = extractToken(req.headers.authorization);
	JWTVerify(token)
		.then((decoded) => {
			req.user = decoded;
			next();
		})
		.catch(error => next(error));
}

export default AuthenticateToken;