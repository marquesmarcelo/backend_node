const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

/**
 * @swagger
 * definitions:
 *   User:
 *     type: object
 *     properties:
 *       nome:
 *         type: string
 *       email:
 *         type: string
 *       password:
 *         type: string
 *       roles:
 *          $ref: '#/definitions/Role'
 *       createAt:
 *         type: string
 *         format: date-time
 *       updateAt:
 *         type: string
 *         format: date-time
 *       required:
 *       - nome
 *       - email
 *       - password
 *       example:
 *          nome: 'João da Silva'
 *          email: 'joao.silva@empresa.com'
 *          password: '123456'       
 */

module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define(
        'User', {
        nome: DataTypes.STRING,
        email: DataTypes.STRING,
        password: DataTypes.VIRTUAL,
        password_hash: DataTypes.STRING,
    },
        {
            hooks: {
                beforeSave: async user => {
                    if (user.password) {
                        user.password_hash = await bcrypt.hash(user.password, 8);
                    }
                }
            }
        }
    );

    User.associate = function (models) {
        User.belongsToMany(models.Role, { foreignKey: 'user_id', through: 'user_roles', as: 'roles' });
    };

    User.prototype.checkPassword = function (password) {
        return bcrypt.compare(password, this.password_hash);
    };

    User.prototype.generateToken = function () {
        return jwt.sign({ sub: this.id, roles: this.roles.map(u => u.nome_maquina) }, process.env.APP_SECRET);
    }
    return User;
};