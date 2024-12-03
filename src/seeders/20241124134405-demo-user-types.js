'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    // Inserindo dados na tabela UserTypes
    await queryInterface.bulkInsert('UserTypes', [
      {
        type_name: 'Admin',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        type_name: 'User',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {

    await queryInterface.bulkDelete('UserTypes', null, {});
  },
};
