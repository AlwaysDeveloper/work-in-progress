'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('shortenurls', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      redirect_to: {
        type: Sequelize.STRING,
        allowNull: false
      },
      alias: {
        type: Sequelize.STRING,
        allowNull: false
      },
      created_by: {
        type: Sequelize.UUID,
        allowNull: false
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
    await queryInterface.dropTable('shortenurls', Sequelize);
  }
};