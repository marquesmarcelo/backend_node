const fileService = require('../services/file.service');

const util = require('../utils/utils')

class FileController {
    async upload(req, res, next) {
        console.log('File:', req.file)

        const { originalname: nome, size, filename: key, path: url } = req.file

        try {
            const file = await fileService.create({
                nome, size, key, url
            })
            util.setSuccess(201, 'Arquivo transferido', file);
        } catch (error) {
            util.setError(400, error);
        }
        return util.send(res);
    }

    async getAll(req, res, next) {        
        try {
            const allFiles = await fileService.getAll();
            if (allFiles.length > 0) {
                util.setSuccess(200, 'Usuários recuperados', allFiles);
            } else {
                util.setSuccess(200, 'Nenhum usuário encontrado');
            }
        } catch (error) {
            util.setError(400, error.message);
        }
        return util.send(res);
    }

    async delete(req, res, next) {
        const id = parseInt(req.params.id);

        try {
            const fileToDelete = await fileService.delete(id);
            util.setSuccess(200, 'Arquivo deletado');

        } catch (error) {
            util.setError(400, error);
        }
        return util.send(res);
    }
}

module.exports = new FileController();