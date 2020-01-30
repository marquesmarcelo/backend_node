module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('roles', [
      {
        nome_maquina: 'ROLE_ADMIN',
        descricao: 'Permissão de Administrador',
        // add createdAt, updatedAt
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        nome_maquina: 'ROLE_USER',
        descricao: 'Permissão Padrão',
        // add createdAt, updatedAt
        created_at: new Date(),
        updated_at: new Date()
      },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Role', null, {});
  }
};
