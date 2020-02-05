const { File } = require('../models')

class FileService {
    async create(newFile) {        
        return await File
            .create(newFile)
            .then((newFile) => newFile)
            .catch((error) => { throw error });
        ;
    }

    async getAll() {
        return await File
            .findAll()
            .then((list) => list)
            .catch((error) => { throw error });
        ;
    }

    async delete(id) {
        return await File
            .findByPk(id)
            .then(obj => {
                if (!obj) throw 'File não encontrado';

                return obj
                    .destroy()
                    .catch((error) => { throw error });
            })
            .catch((error) => { throw error });
    }

}
module.exports = new FileService();