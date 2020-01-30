const { Role, User } = require('../models')

class RoleController {
    async index(req, res) {
        return await Role
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
        const { nome_maquina, descricao } = req.body;

        const obj = await Role.findOne({ where: { nome_maquina } })

        if (obj)
            return res.status(401).json({ message: 'Role já cadastrada' });

        return await Role
            .create({
                nome_maquina, descricao
            })
            .then((newObj) => res.status(201).json(newObj))
            .catch((error) => res.status(400).json({ message: error }));
        ;
    }
    
    async getById(req, res) {
        const id = req.params.id;

        return await Role
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
        const { nome_maquina, descricao } = req.body;
        const id = req.params.id;

        return await Role
            .findByPk(id)
            .then(obj => {
                if (!obj) {
                    return res.status(404).json({
                        message: 'Objeto não encontrado',
                    });
                }
                return obj
                    .update({
                        nome: nome_maquina || obj.nome_maquina,
                        descricao: descricao || obj.descricao
                    })
                    .then(() => res.status(200).send(obj))
                    .catch((error) => res.status(400).json({ message: error }));
            })
            .catch((error) => res.status(400).json({ message: error }));
    }

    async delete(req, res) {
        const id = req.params.id;
        return await Role
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
                    .catch((error) => res.status(400).json({
                        message: error,
                    }));
            })
            .catch((error) => res.status(400).json({ message: error }));
    }
}

module.exports = new RoleController();