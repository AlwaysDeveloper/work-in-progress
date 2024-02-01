import enums from "../constants/enums";
import UserRepository from "../repositories/UserRepository";
import AuthenticationError from "../utils/errors/authenticationerror";

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
					isActive: enums.userStatus.active,
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