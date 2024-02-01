import rule from "@validation/rule";
import notEmpty from "@validation/notEmpty";
import included from "@validation/included";
import { UserRoles } from "@constants/enums";
import { BodyDto } from "@utils/DTO";

export default class ValidateForOtherServicesDto extends BodyDto {
	token;
	userRole;

	constructor(source) {
		super(source)
			.validate({
				token: [rule(notEmpty, "Token is required!")],
				userRole: [rule(notEmpty, "User role is required!"), rule(included(Object.values(UserRoles)), "User role is not valid!")]
			})
			.get(this);
	}
}