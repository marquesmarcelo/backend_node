
module.exports = (sequelize, DataTypes) => {
  const Role = sequelize.define('Role', {
    nome_maquina: DataTypes.STRING,
    descricao: DataTypes.STRING,
  }, {});
  Role.associate = function (models) {
    Role.belongsToMany(models.User, {
      foreignKey: 'role_id',
      through: 'user_roles',
      as: 'users' });
  };
  return Role;
};