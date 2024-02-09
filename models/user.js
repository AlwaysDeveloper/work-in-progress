/* eslint-disable no-undef */
"use strict";

import { Model } from "sequelize";

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
			type: DataTypes.ENUM(["USER", "ADMIN"]),
			field: "user_role",
			allowNull: false,
			defaultValue: "USER"
		},
		isActive: {
			type: DataTypes.ENUM(["ACTIVE"]),
			field: "is_active",
			allowNull: false,
			defaultValue: "ACTIVE"
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
	});
	return User;
};