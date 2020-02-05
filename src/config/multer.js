const multer = require('multer')
const path = require('path')
const crypto = require('crypto')
const pathFile = path.resolve(__dirname, "..", "..", "tmp", "uploads")

module.exports = {
    dest: pathFile,
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, pathFile);
        },
        filename: (req, file, cb) => {
            crypto.randomBytes(16, (err, hash) => {
                if (err) cb(err);
                const fileName = `${hash.toString('hex')}-${file.originalname}`
                cb(null, fileName)
            })
        }
    }),
    limits: {
        fileSize: 2 * 1024 * 1024, //2MB
    },
    fileFilter: (req, file, cb) => {
        const allowedMimes = [
            'image/jpeg',
            'image/pjpeg',
            'image/png',
            'image/gif',
            'application/pdf'
        ]

        if (allowedMimes.includes(file.mimetype)) {
            cb(null, true)
        }
        else {
            cb(new Error('Tipo de arquivo invalido'))
        }
    }
};