'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await Promise.all([
      queryInterface.addColumn('users', 'fullName', {
        type: Sequelize.STRING,
        allowNull: false
      }),
      queryInterface.addColumn('users', 'countryCode', {
        type: Sequelize.STRING,
        allowNull: false
      })
    ]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await Promise.all([
      queryInterface.removeColumn('users', 'fullName', Sequelize),
      queryInterface.removeColumn('users', 'countryCode', Sequelize)
    ]);
  }
};
