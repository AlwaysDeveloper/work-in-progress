/* eslint-disable no-undef */
"use strict";
const {
	Model
} = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class ShortenUrl extends Model {
		/**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
		static associate() {
			// define association here
		}
	}
	ShortenUrl.init({
		id: {
			allowNull: false,
			autoIncrement: true,
			primaryKey: true,
			type: DataTypes.INTEGER
		},
		redirectTo: {
			type: DataTypes.STRING,
			allowNull: false,
			field: "redirect_to"
		},
		alias: {
			type: DataTypes.STRING,
			allowNull: false,
			field: "alias"
		},
		createdBy: {
			type: DataTypes.UUID,
			allowNull: false,
			field: "created_by",
			defaultValue: "1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed"
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
		modelName: "ShortenUrl",
		tableName: "shortenurls"
	});
	return ShortenUrl;
};