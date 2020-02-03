'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('user_roles', [
      {
        user_id: 1,
        role_id: 1,       
        // add createdAt, updatedAt
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        user_id: 1,
        role_id: 2,        
        // add createdAt, updatedAt
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        user_id: 2,
        role_id: 2,       
        // add createdAt, updatedAt
        created_at: new Date(),
        updated_at: new Date()
      },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('user_roles', null, {});
  }
};
