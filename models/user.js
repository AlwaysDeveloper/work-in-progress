/* eslint-disable no-undef */
"use strict";

import { Model } from "sequelize";
import { v4 } from "uuid";
import crypto from "crypto";
import { UserRoles, UserStatus } from "../constants/enums";
import PasswordManager from "../common/PasswordManager";

module.exports = (sequelize, DataTypes) => {
	class User extends Model {
		/**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
		static associate() {
			// define association here
		}

		toJSON() {
			const user = this.dataValues;
			delete user["id"];
			delete user["createdAt"];
			delete user["updatedAt"];
			delete user["password"];
			return user;
		}
	}
	User.init({
		id: {
			allowNull: false,
			autoIncrement: true,
			primaryKey: true,
			type: DataTypes.INTEGER
		},
		exId: {
			allowNull: false,
			type: DataTypes.UUID,
			primaryKey: true
		},
		username: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true
		},
		password: {
			type: DataTypes.STRING,
			allowNull: false
		},
		fullName: {
			type: DataTypes.STRING,
			allowNull: false
		},
		email: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true
		},
		countryCode: {
			type: DataTypes.STRING,
			allowNull: false
		},
		msnid: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true
		},
		userRole: {
			type: DataTypes.ENUM(Object.values(UserRoles)),
			field: "user_role",
			allowNull: false,
			defaultValue: UserRoles.user
		},
		isActive: {
			type: DataTypes.ENUM(Object.values(UserStatus)),
			field: "is_active",
			allowNull: false,
			defaultValue: UserStatus.active
		},
		createdAt: {
			allowNull: false,
			type: DataTypes.DATE,
			defaultValue: DataTypes.NOW
		},
		updatedAt: {
			allowNull: false,
			type: DataTypes.DATE,
			defaultValue: DataTypes.NOW
		}
	}, {
		sequelize,
		modelName: "User",
		tableName: "users",
		hooks: {
			beforeValidate: async (user) => {
				if(!user.exId){
					user.exId = v4();
				}
				if(!user.password) {
					user.password = await new PasswordManager().hash(user.password ? user.password : crypto.randomBytes(32).toString("hex"));
				}
			},
			beforeCreate: async (user) => {
				user.password = await new PasswordManager().hash(user.password ? user.password : crypto.randomBytes(32).toString("hex"));
				if (!user.username) {
					user.username = `${user.email.split("@")[0]}@${user.msnid.split(user.msnid.length - 1)}`;
				}
			}
		}
	});
	return User;
};