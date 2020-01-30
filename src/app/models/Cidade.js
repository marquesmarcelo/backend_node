'use strict';
module.exports = (sequelize, DataTypes) => {
  const Cidade = sequelize.define('Cidade', {
    nome: DataTypes.STRING,   
  }, {});
  Cidade.associate = function(models) {
    Cidade.belongsTo(models.Estado, {
      foreignKey: 'estado_id',
    });
  };
  return Cidade;
};