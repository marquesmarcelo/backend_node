const userService = require('../services/user.service');

class UserController {

    async authenticate(req, res, next) {
        userService.login(req.body)
            .then(user => user ? res.json(user) : res.status(401).json({ message: 'Nome de usuário ou senha incorreto' }))
            .catch(err => next(err));
    }

    async getAll(req, res, next) {
        userService.getAll()
            .then(users => res.json(users))
            .catch(err => next(err));
    }

    async getById(req, res, next) {
        const currentUser = req.user;
        const id = parseInt(req.params.id);


        // permite somento usuário com a permissão 'ROLE_ADMIN' acessar o recurso
        if (id !== currentUser.sub && !currentUser.roles.includes('ROLE_ADMIN')) {
            return res.status(401).json({ message: 'Não autorizado a visualizar o registro id=' +id });
        }

        userService.getById(req.params.id)
            .then(user => user ? res.json(user) : res.sendStatus(404))
            .catch(err => next(err));
    }

    async deleteObj(req, res, next) {
        const id = parseInt(req.params.id);

        userService.deleteObj(id)
            .then(user => user ? res.json(user) : res.sendStatus(404))
            .catch(err => next(err));
    }

    async store(req, res, next) {
        const { nome, email, password } = req.body;

        userService.store(nome, email, password)
            .then(user => user ? res.json(user) : res.sendStatus(404))
            .catch(err => next(err));
    }

    async update(req, res, next) {
        const id = req.params.id;
        const { nome, email, password } = req.body;

        userService.update(id, nome, email, password)
            .then(user => user ? res.json(user) : res.sendStatus(404))
            .catch(err => next(err));
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