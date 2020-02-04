const router = require('express').Router();
const SessionController = require('../controllers/session.controller');

//Rota da aplicação

/**
* @swagger
* /session/login:
*   post:
*     tags:
*       - Sessão
*     name: Login
*     summary: Autenticar com um usuário
*     consumes:
*       - application/json
*     parameters:
*       - name: body
*         in: body
*         schema:
*           type: object
*           properties:
*             email:
*               type: string
*             password:
*               type: string
*               format: password
*         required:
*           - email
*           - password
*     responses:
*       200:
*         description: Usuário encontrado e logado com sucesso
*       401:
*         description: Nome do usuário não encontrado no banco de dados
*       403:
*         description: Nome do usuári e/ou senha inválido
*/
router.post('/login', SessionController.login);     // public route

module.exports = router;