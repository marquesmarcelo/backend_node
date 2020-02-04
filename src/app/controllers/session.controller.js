const sessionService = require('../services/session.service');

class SessionController {
    /**
    * @swagger
    * /login:
    *   post:
    *     tags:
    *       - Users
    *     name: Login
    *     summary: Logar com um usuário
    *     consumes:
    *       - application/json
    *     parameters:
    *       - name: body
    *         in: body
    *         schema:
    *           $ref: '#/definitions/User'
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
    *         description: Usuário logado e autenticado com sucesso
    *       401:
    *         description: Usuário não encontrado
    *       403:
    *         description: Nome do usuário ou senha incorreto
    */
    async login(req, res, next) {
        sessionService.login(req.body)
            .then(user => user ? res.json(user) : res.status(401).json({ message: 'Nome de usuário ou senha incorreto' }))
            .catch(err => next(err));
    }
}
module.exports = new SessionController();