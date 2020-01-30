const { Estado, Cidade } = require('../models')

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

    async store(req, res) {
        const { nome, sigla } = req.body;

        const obj = await Estado.findOne({ where: { sigla } })

        if (obj)
            return res.status(401).json({ message: 'Estado já cadastrado' });

        return await Estado
            .create({
                nome, sigla
            })
            .then((newObj) => res.status(201).json(newObj))
            .catch((error) => res.status(400).json({ message: error }));
        ;
    }

    async storeCidade(req, res) {
        const { nome } = req.body;
        const estado_id = req.params.estado_id;

        const estado = await Estado.findByPk(estado_id)

        if (!estado)
            return res.status(401).json({ message: 'Estado não encontrado' });

        const [cidade, created] = await Cidade.findOrCreate({
            where: { nome, estado_id }
        });       

        return res.status(200).json(cidade);
    }

}

module.exports = new EstadoController();