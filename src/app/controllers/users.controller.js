const userService = require('../services/user.service');

const util = require('../utils/utils')

class UserController {    
    async getAll(req, res, next) {
        const filter = req.query.attributes || { nome: "marcelo"};
        const attributes = req.query.attributes || ['id', 'nome', 'email', 'createdAt', 'updatedAt'];
        const order = req.query.order || [['nome', 'ASC']];
        const limit = req.query.limit || 10;
        const offset = req.query.offset || 0;

        try {
            const allUsers = await userService.getAll(attributes, order, limit, offset);
            if (allUsers.length > 0) {
                util.setSuccess(200, 'Usuários recuperados', allUsers);
            } else {
                util.setSuccess(200, 'Nenhum usuário encontrado');
            }
        } catch (error) {
            util.setError(400, error.message);
        }
        return util.send(res);
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
                util.setError(404, `Não foi encontrado nenhum Usuário com o id= ${id}`);
            } else {
                util.setSuccess(200, 'Usuário encontrado', user);
            }
        } catch (error) {
            util.setError(404, error);
        }
        return util.send(res);
    }


    async delete(req, res, next) {
        const id = parseInt(req.params.id);

        try {
            const userToDelete = await userService.delete(id);
            util.setSuccess(200, 'Usuário deletado');

        } catch (error) {
            util.setError(400, error);
        }
        return util.send(res);
    }


    async create(req, res, next) {
        const newUser = req.body;

        try {
            const createdUser = await userService.create(newUser);
            util.setSuccess(201, 'Usuário adicionado', createdUser);
        } catch (error) {
            util.setError(400, error);
        }
        return util.send(res);
    }

    async update(req, res, next) {
        const id = req.params.id;
        const alteredUser = req.body;
        try {
            const updateUser = await userService.update(id, alteredUser);
            util.setSuccess(200, 'Usuário atualizado', updateUser);
                                   
        } catch (error) {
            util.setError(404, error);            
        }
        return util.send(res);
    }

    async storeRole(req, res, next) {
        const alteredRole = req.body;
        const user_id = req.params.user_id;        
        try {            
            const role = await userService.storeRole(user_id, alteredRole)
            util.setSuccess(200, 'Role adicionada ao usuário', role);
        } catch (error) {
            util.setError(404, error);
        }
        return util.send(res);
    }
}

module.exports = new UserController();