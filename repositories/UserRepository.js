import { Op } from "sequelize";
import Repository from "../models";

export default class UserRepository extends Repository {
	constructor() {
		super("User");
	}

	findByUsername(username) {
		return this.findOne({where: { [Op.or]: [{uniqueid: username}, {mobile: username}, {email: username}] }});
	}
}