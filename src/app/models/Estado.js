/**
 * @swagger
 * definitions:
 *   Estado:
 *     type: object
 *     properties:
 *       nome:
 *         type: string
 *       sigla:
 *         type: string 
 *       createAt:
 *         type: string
 *         format: date-time
 *       updateAt:
 *         type: string
 *         format: date-time
 *       required:
 *       - nome
 *       - sigla
 *     example:
 *       nome: 'Distrito Federal'
 *       sigla: 'DF'       
 */
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