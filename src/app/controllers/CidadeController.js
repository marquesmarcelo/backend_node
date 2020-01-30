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

    async store(req, res) {        
        const { nome, estado_id } = req.body;

        const obj = await Cidade.findOne({ where: { nome, estado_id } })

        if (obj)
            return res.status(401).json({ message: 'Cidade já cadastrada' });

        return await Cidade
            .create({
                nome, estado_id
            })
            .then((newObj) => res.status(201).json(newObj))
            .catch((error) => res.status(400).json({ message: error }));
        ;
    }    
}

module.exports = new CidadeController();