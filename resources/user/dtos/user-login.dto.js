import rule from "@validation/rule";
import notEmpty from "@validation/notEmpty";
import { BodyDto } from "@utils/DTO";
export default class UserLoginCredentialsDto extends BodyDto{
	username;
	password;

	constructor(source) {
		super(source)
			.validate({
				username: [rule(notEmpty, "Username is required!")],
				password: [rule(notEmpty, "Password is required!")]
			})
			.get(this);
	}
}