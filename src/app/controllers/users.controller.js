const userService = require('../services/user.service');

const util = require('../utils/utils')

class UserController {
    
    async getAll(req, res, next) {
        const attributes = req.query.attributes || ['id', 'nome', 'email', 'createdAt', 'updatedAt'];
        const order = req.query.order || [['nome', 'ASC']];
        const limit = req.query.limit || 10;
        const offset = req.query.offset || 0;

        try {
            const allUsers = await userService.getAll(attributes, order, limit, offset);
            if (allUsers.length > 0) {
                util.setSuccess(200, 'Users retrieved', allUsers);
            } else {
                util.setSuccess(200, 'No User found');
            }
            return util.send(res);
        } catch (error) {
            util.setError(400, error.message);
            return util.send(res);
        }
    }

    async getById(req, res, next) {
        const currentUser = req.user;
        const id = parseInt(req.params.id);


        // permite somento usuário com a permissão 'ROLE_ADMIN' acessar o recurso
        if (id !== currentUser.sub && !currentUser.roles.includes('ROLE_ADMIN')) {
            return res.status(401).json({ message: 'Não autorizado a visualizar o registro id=' + id });
        }
        try {
            const user = await userService.getById(id);

            if (!user) {
                util.setError(404, `Cannot find user with the id ${id}`);
            } else {
                util.setSuccess(200, 'Found User', user);
            }
            return util.send(res);
        } catch (error) {
            util.setError(404, error);
            return util.send(res);
        }
    }


    async deleteObj(req, res, next) {
        const id = parseInt(req.params.id);

        try {
            const userToDelete = await userService.getById(id);

            if (userToDelete) {
                util.setSuccess(200, 'User deleted');
            } else {
                util.setError(404, `User with the id ${id} cannot be found`);
            }
            return util.send(res);
        } catch (error) {
            util.setError(400, error);
            return util.send(res);
        }
    }


    async store(req, res, next) {
        const newUser = req.body;

        try {
            const createdUser = await userService.store(newUser);
            util.setSuccess(201, 'User Added!', createdUser);
            return util.send(res);
        } catch (error) {
            util.setError(400, error);
            return util.send(res);
        }
    }

    async update(req, res, next) {
        const id = req.params.id;
        const alteredUser = req.body;
        try {
            const updateUser = await userService.update(id, alteredUser);
            if (!updateUser) {
                util.setError(404, `Cannot find user with the id: ${id}`);
            } else {
                util.setSuccess(200, 'User updated', updateUser);
            }
            return util.send(res);
        } catch (error) {
            util.setError(404, error);
            return util.send(res);
        }
    }

    async storeRole(req, res, next) {
        const { nome_maquina, descricao } = req.body;
        const user_id = req.params.user_id;

        userService.storeRole(user_id, nome_maquina, descricao)
            .then(user => user ? res.json(user) : res.sendStatus(404))
            .catch(err => next(err));
    }
}

module.exports = new UserController();