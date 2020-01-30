const { Estado, Cidade } = require('../models')

class CidadeController {
    async index(req, res) {
        return await Cidade
            .findAll({
                include: [Estado],
                order: [
                    ['createdAt', 'DESC']
                ],
            })
            .then((list) => res.status(200).json(list))
            .catch((error) => res.status(400).json({ message: error }));
        ;
    }
}

module.exports = new CidadeController();