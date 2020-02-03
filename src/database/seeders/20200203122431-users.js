'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('users', [
      {
        nome: 'admin',
        email: 'admin@teste.com',
        password_hash: '$2a$08$J9D1x83912gUdKvEz5fY..YHyTj4SP5SZtD9PtQoimynY5SRgwvc.',
        // add createdAt, updatedAt
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        nome: 'user',
        email: 'user@teste.com',
        password_hash: '$2a$08$J9D1x83912gUdKvEz5fY..YHyTj4SP5SZtD9PtQoimynY5SRgwvc.',
        // add createdAt, updatedAt
        created_at: new Date(),
        updated_at: new Date()
      },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('users', null, {});
  }
};
