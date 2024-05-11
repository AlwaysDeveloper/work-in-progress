import Controller from "Controller";
import UserRepository from "repositories/UserRepository";
import LoginDto from "./dto/Login.dto";
import LoginService from "./login.service";
import { AwsReconService } from "../aws/aws-recon.service";

export default class LoginController extends Controller {
	constructor() {
		super(new LoginService(new UserRepository()), new AwsReconService());
	}

	login = this.post(
		"/v1/login", 
		this.response(
			(req) => this.loginService.loginAndCreateToken(new LoginDto(req)), 
			"LoggedIn successfully!", 
			"Not able to login, please try later!"
		)
	);
}