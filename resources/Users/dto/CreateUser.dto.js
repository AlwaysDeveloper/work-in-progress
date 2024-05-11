import {rule, notEmpty, isEmail, included} from "../../../lib/validations";
import Dto from "DTO";

export default class CreateUserDto extends Dto {
	name;
	mobile;
	email;
	userType;
	constructor(source) {
		super(source, {
			// Example: customProperty: [rule(customValidationFunction, 'Custom error message')],
			name: [rule(notEmpty, "Name is required!")],
			mobile: [rule(notEmpty, "Mobile is required!"),],
			email: [rule(notEmpty, "Email is required!"), rule(isEmail, "Email is not valid!")],
			userType: [rule(notEmpty, "User type is required!"), rule(included, "User type is not valid!")],
		}).fromBody(this);
	}
}