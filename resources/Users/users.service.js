import Injectable from "Injectable";

export default class UserService extends Injectable{
	constructor(...args) {
		super(...args);
	}

	async createUser(user) {
		return this.userRepository.create(user);
	}

	async getUser() {
		return this.userRepository.findOne();
	}
}