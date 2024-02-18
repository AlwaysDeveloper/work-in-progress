import UserRepository from "repositories/UserRepository";
import AuthenticationError from "errors/authenticationerror";
import { UserStatus } from "../constants/User.constant";

/**
 * 
 * @param {string} UserRole 
 * @returns 
 */
export default function Authorization(UserRole) {
	return async (req, res, next) => {
		try {
			if(!req.user) {
				throw new AuthenticationError("Unauthorized");
			}
        
			const repository = new UserRepository();
			const user = await repository.find({ 
				arrtibutes: ["exId"],
				where: { 
					exId: req.user.id,
					isActive: UserStatus.ACTIVE,
					userRole: UserRole
				} 
			});
        
			if(user === null) {
				throw new AuthenticationError("Unauthorized");
			}
			next();
		} catch (error) {
			next(error);
		}
	};
}