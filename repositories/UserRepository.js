import { QueryTypes } from "sequelize";
import Repository from "../models";

export default class UserRepository extends Repository {
	constructor() {
		super("User");
	}

	getUserCredentials(exId) {
		return this.query(
			"SELECT exId, password, user_role FROM users WHERE exId = :id;",
			QueryTypes.SELECT,
			{ id: exId }
		);
	}
}