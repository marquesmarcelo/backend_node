const router =  require('express').Router();
const SessionController = require('../controllers/session.controller');

//Rota da aplicação
router.post('/login', SessionController.login);     // public route

module.exports = router;