const { User } = require('../models')

class UserController {
    async index(req, res) {
        return await User
            .findAll({
                order: [
                    ['createdAt', 'DESC']
                ],
            })
            .then((list) => res.status(200).json(list))
            .catch((error) => res.status(400).json({ message: error }));
        ;
    }

    async store(req, res) {
        const { nome, email, password } = req.body;

        const obj = await User.findOne({ where: { email } })

        if (obj)
            return res.status(401).json({ message: 'Usuário já cadastrado' });

        return await User
            .create({
                nome, email, password
            })
            .then((newObj) => res.status(201).json(newObj))
            .catch((error) => res.status(400).json({ message: error }));
        ;
    }

    async getById(req, res) {
        const id = req.params.id;

        return await User
            .findByPk(id)
            .then((obj) => {
                if (!obj) {
                    return res.status(404).json({
                        message: 'Objeto não encontrado',
                    });
                }
                return res.status(200).json(obj);
            })
            .catch((error) => res.status(400).json({ message: error }));
    }


    async update(req, res) {
        const id = req.params.id;

        const { nome, email, password } = req.body;

        return await User
            .findByPk(id)
            .then(obj => {
                if (!obj) {
                    return res.status(404).json({
                        message: 'Objeto não encontrado',
                    });
                }
                return obj
                    .update({
                        nome: nome || obj.nome,
                        email: email || obj.email,
                        password: password || obj.password,
                    })
                    .then(() => res.status(200).send(obj))
                    .catch((error) => res.status(400).json({ message: error }));
            })
            .catch((error) => res.status(400).json({ message: error }));
    }

    async delete(req, res) {
        const id = req.params.id;
        return await User
            .findByPk(id)
            .then(obj => {
                if (!obj) {
                    return res.status(400).json({
                        message: 'Objeto não encontrado',
                    });
                }
                return obj
                    .destroy()
                    .then(() => res.status(204).send())
                    .catch((error) => res.status(400).json({ message: error }));
            })
            .catch((error) => res.status(400).json({
                message: error,
            }));
    }
}

module.exports = new UserController();