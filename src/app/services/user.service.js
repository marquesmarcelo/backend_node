const jwt = require('jsonwebtoken');
const { User, Role } = require('../models')

function UserException(message) {
    this.message = message
}

class UserService {
    
    async getAll(attributes, order, limit, offset) {

        return await User
            .findAll({
                include: [{ model: Role, as: 'roles' },],
                attributes,                
                order,
                limit,
                offset
            })
            .then((list) => list)
            .catch((error) => { throw error });
        ;
    }

    async store(newUser) {
        const user = await User.findOne({
            where: { email: newUser.email }
        })
            .then((user) => {
                if (user) throw 'Email já esta cadastrado'                
            })
            .catch((error) => { throw error });
        
        return await User
            .create(newUser)
            .then((newUser) => newUser)
            .catch((error) => { throw error });
        ;
    }

    async update(id, updatedUser) {
        return await User
            .findByPk(id)
            .then(user => {
                if (!user) throw 'Usuário não encontrado';

                return user
                    .update({
                        nome: updatedUser.nome || user.nome,
                        email: updatedUser.email || user.email,
                        password: updatedUser.password || user.password,
                    })
                    .then((updatedUser) => updatedUser)
                    .catch((error) =>  { throw error });
            })
            .catch((error) => { throw error });
    }

    async getById(id) {

        return await User
            .findByPk(id, {
                attributes: ['id', 'nome', 'email', 'createdAt', 'updatedAt'],
                include: [{ model: Role, as: 'roles' },]
            })
            .then((obj) => {
                if (!obj) throw 'Usuário não encontrado';

                return obj;
            })
            .catch((error) => { throw error });
    }
   

    async deleteObj(id) {
        return await User
            .findByPk(id)
            .then(obj => {
                if (!obj) throw 'Usuário não encontrado';

                return obj
                    .destroy()
                    .catch((error) => { throw error });
            })
            .catch((error) => { throw error });
    }

    async storeRole(user_id, nome_maquina, descricao) {

        const user = await User.findByPk(user_id)

        if (!user) throw 'Usuário não encontrado';

        const [role, created] = await Role.findOrCreate({
            where: { nome_maquina, descricao }
        });

        await user.addRole(role)
            .catch((error) => { throw error });

        return role;
    }
}

module.exports = new UserService();