import Injectable from "Injectable";
import AuthenticationError from "errors/authenticationerror";
import { JWTSign } from "../../common/JWT";

export default class LoginService extends Injectable{
	constructor(...args) {
		super(...args);
	}

	async loginAndCreateToken({username, password}) {
		const user = await this.userRepository.findByUsername(username);
		if(user === null) {
			throw new AuthenticationError("Username or password is incorrect!");
		}else if(password !== user.password) {
			throw new AuthenticationError("Username or password is incorrect!");
		}
		return JWTSign({username: user.uniqueid, userType: user.userType});
	} 
}