import Controller from "Controller";
import UserRepository from "repositories/UserRepository";
import UserService from "./users.service";
import CreateUserDto from "./dto/CreateUser.dto";

export default class UserController extends Controller {
	constructor() {
		super(
			new UserService(
				new UserRepository()
			)
		);
	}

	createUser = this.post(
		"/users/create", 
		this.response(
			async (req) => {
				const result = await this.userService.createUser(new CreateUserDto(req));
				return result;
			}, 
			"Created new user successfully!", 
			"Not able to create user!"
		)
	);

	helloWorld = this.get("/check", this.response((req) => {
		if(req.query.error) {
			throw new Error("Check Error");
		}
		return 123;
	}, "success", "error"));
}