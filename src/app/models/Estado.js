'use strict';
module.exports = (sequelize, DataTypes) => {
  const Estado = sequelize.define('Estado', {
    nome: DataTypes.STRING,
    sigla: DataTypes.STRING
  }, {});
  Estado.associate = function(models) {
    Estado.hasMany(models.Cidade, {
      foreignKey: 'estado_id',
      as: 'cidades'
    });
  };
  return Estado;
};