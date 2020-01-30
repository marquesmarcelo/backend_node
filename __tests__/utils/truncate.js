const { sequelize } = require('../../src/app/models');

module.exports = () => {
    //Juntar todas as promise em uma só
    //varrer o diretório models para identificar todas as tabelas para eliminar os dados
    return Promise.all(Object.keys(sequelize.models).map(key => {
        return sequelize.models[key].destroy({truncate: true, force: true});
    }));
};