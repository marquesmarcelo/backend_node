const { User, Role } = require('../models')

class SessionService {
    async login({ email, password }) {
        const user = await User.findOne({
            include: [{ model: Role, as: 'roles' },],
            where: { email }
        })

        if (user) {
            if ((await user.checkPassword(password))) {
                return {
                    user,
                    token: user.generateToken()
                };

            }
        }
    }
}
module.exports = new SessionService();