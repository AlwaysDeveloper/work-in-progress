import { UserStatus } from "../../constants/enums";
import AuthenticationError from "../../utils/errors/authenticationerror";
import { JWTSign, JWTVerify } from "../../common/JWT";
import Injectable from "../../utils/Injectable";

export default class UserService extends Injectable{
	constructor(...args) { 
		super(...args);
	}

	async create(user) {
		const newUser = await this.userRepository.create(user);
		const token = JWTSign({ id: newUser.exId, userRole: newUser.user_role });
		return { ...newUser.toJSON(), token };
	}

	async login(userCredentials) {
		const user = await this.userRepository.find({
			attributes: ["password", "userRole", "exId"],
			where: {
				username: userCredentials.username,
				isActive: UserStatus.active
			}
		});
		const isPasswordCheck = await this.passwordManager.verify(user.password, userCredentials.password);
		if(!isPasswordCheck) {
			throw new AuthenticationError("Username or password is invalid!");
		}
		const token = JWTSign({ id: user.exId, userRole: user.userRole });
		return { token, isLoggedIn: true };
	}

	async loginWithToken(loginCredentials) {
		const decoded = await JWTVerify(loginCredentials.token);
		const user = await this.userRepository.find({
			where: {
				exId: decoded.id,
				userRole: loginCredentials.userRole,
				isActive: UserStatus.active
			}
		});
		return user;
	}
}
