'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      uniqueid: {
        allowNull: false,
        type: Sequelize.STRING,
        unique: true
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      userType: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: "USER"
      },
      mobile: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      lastLogin: {
        type: Sequelize.DATE,
        allowNull:false,
        defaultValue: Sequelize.literal("NOW()")
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("NOW()")
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("NOW()")
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('users');
  }
};