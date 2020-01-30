const { Estado } = require('../models')

class EstadoController {
    async index(req, res) {
        return await Estado
            .findAll({
                order: [
                    ['createdAt', 'DESC']
                ],
            })
            .then((list) => res.status(200).json(list))
            .catch((error) => res.status(400).json({ message: error }));
        ;
    }
}

module.exports = new EstadoController();