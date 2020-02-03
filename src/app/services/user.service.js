const jwt = require('jsonwebtoken');
const { User, Role } = require('../models')

function UserException(message, name) {
    this.message = message;
    this.name = name || "UserException";
}

class UserService {
    async login({ email, password }) {
        const user = await User.findOne({
            include: [{ model: Role, as: 'roles' },],
            where: { email }
        })

        if (user) {
            if ((await user.checkPassword(password))) {
                return {
                    user,
                    token: user.generateToken()
                };

            }
        }
    }

    async getAll() {
        return await User
            .findAll({
                attributes: ['id', 'nome', 'email', 'createdAt', 'updatedAt'],
                include: [{ model: Role, as: 'roles' },],
                order: [
                    ['createdAt', 'DESC']
                ],
            })
            .then((list) => list)
            .catch((error) => { throw new UserException(error) });
        ;
    }

    async getById(id) {
        return await User
            .findByPk(id, {
                attributes: ['id', 'nome', 'email', 'createdAt', 'updatedAt'],
                include: [{ model: Role, as: 'roles' },]
            })
            .then((obj) => {
                if (!obj) throw new UserException('Usuário não encontrado', 'UserExceptionNotFound');

                return obj;
            })
            .catch((error) => { throw new UserException(error) });
    }

    async store(nome, email, password) {
        const obj = await User.findOne({ where: { email } })

        if (obj) throw new UserException('Usuário já cadastrado', 'UserExceptionFound');

        return await User
            .create({
                nome, email, password
            })
            .then((newObj) => newObj)
            .catch((error) => { throw new UserException(error) });
        ;
    }

    async update(id, nome, email, password) {
        return await User
            .findByPk(id)
            .then(obj => {
                if (!obj) throw new UserException('Usuário não encontrado', 'UserExceptionNotFound');

                return obj
                    .update({
                        nome: nome || obj.nome,
                        email: email || obj.email,
                        password: password || obj.password,
                    })
                    .then(() => obj)
                    .catch((error) => { throw new UserException(error) });
            })
            .catch((error) => { throw new UserException(error) });
    }

    async deleteObj(id) {

        return await User
            .findByPk(id)
            .then(obj => {
                if (!obj) throw new UserException('Usuário não encontrado', 'UserExceptionNotFound');

                return obj
                    .destroy()
                    .catch((error) => { throw new UserException(error) });
            })
            .catch((error) => { throw new UserException(erro) });
    }

    async storeRole(user_id, nome_maquina, descricao) {

        const user = await User.findByPk(user_id)

        if (!user) throw new UserException('Usuário não encontrado', 'UserExceptionNotFound');

        const [role, created] = await Role.findOrCreate({
            where: { nome_maquina, descricao }
        });

        await user.addRole(role)
            .catch((error) => { throw new UserException(error) });

        return role;
    }
}

module.exports = new UserService();