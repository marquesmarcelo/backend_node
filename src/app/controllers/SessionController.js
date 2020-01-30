const { User } = require('../models')

class SessionController {
    async login(req, res) {
        const { email, password } = req.body;

        const user = await User.findOne({ where: { email } })

        if (!user)
            return res.status(401).json({ message: 'Usuário não encontrado' });

        if (!(await user.checkPassword(password)))
            return res.status(401).json({ message: 'Senha invalida' });

        return res.status(200).json({
            user,
            token: user.generateToken()
        });
    }
}

module.exports = new SessionController();