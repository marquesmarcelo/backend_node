/**
 * @swagger
 * definitions:
 *   File:
 *     type: object
 *     properties:
 *       nome:
 *         type: string
 *         required: true    
 *       url:
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
 *       nome: 'foto.jpg'
 *       url: '/pasta/foto.jpg'     
 */

module.exports = (sequelize, DataTypes) => {
    const File = sequelize.define('File', {
      nome: DataTypes.STRING,
      size: DataTypes.INTEGER,
      key: DataTypes.STRING,  
      url: DataTypes.STRING, 
    }, {});
    
    return File;
  };