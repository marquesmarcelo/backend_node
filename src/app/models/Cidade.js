/**
 * @swagger
 * definitions:
 *   Cidade:
 *     type: object
 *     properties:
 *       nome:
 *         type: string
 *         required: true    
 *       createAt:
 *         type: string
 *         format: date-time
 *       updateAt:
 *         type: string
 *         format: date-time
 *       required:
 *       - nome
 *     example:
 *       nome: 'Brasília'     
 */

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