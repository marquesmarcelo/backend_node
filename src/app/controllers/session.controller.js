const sessionService = require('../services/session.service');

class SessionController {    
    async login(req, res, next) {
        sessionService.login(req.body)
            .then(user => user ? res.json(user) : res.status(401).json({ message: 'Nome de usuário ou senha incorreto' }))
            .catch(err => next(err));
    }
}
module.exports = new SessionController();