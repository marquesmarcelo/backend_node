const multer = require('multer')
const router =  require('express').Router();
const authorize = require('../_helpers/authorize')
const multerConfig = require('../../config/multer')
const FileController = require('../controllers/file.controller')

router.post('/upload', multer(multerConfig).single('file'), FileController.upload);

router.get('/', FileController.getAll);

router.delete('/:id', FileController.delete);

module.exports = router;