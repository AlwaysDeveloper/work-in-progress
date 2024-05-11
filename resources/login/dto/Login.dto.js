/* eslint-disable indent */
import {rule, notEmpty} from "../../../lib/validations";
import { BodyDto } from "DTO";

export default class LoginDto extends BodyDto {
	username;
	password;
	constructor(source) {
		super(source)
			.validate({
				// Example: customProperty: [rule(customValidationFunction, 'Custom error message')],
                username: [rule(notEmpty, "Username is required!")],
                password: [rule(notEmpty, "Password is required!")]
			})
			.get(this);
	}
}