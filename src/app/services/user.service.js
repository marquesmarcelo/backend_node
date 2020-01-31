const jwt = require('jsonwebtoken');
//const Role = require('../_helpers/role');
const { User, Role } = require('../models')

// users hardcoded for simplicity, store in a db for production applications
const users = [
    { id: 1, nome: 'admin', email: 'admin@teste.com', password: 'admin', role: Role.Admin },
    { id: 2, nome: 'user', email: 'user@teste.com', password: 'user', role: Role.User }
];

async function authenticate({ email, password }) {
    const user = users.find(u => u.email === email && u.password === password);
    if (user) {
        const token = jwt.sign({ sub: user.id, role: user.role }, process.env.APP_SECRET);
        const { password, ...userWithoutPassword } = user;
        return {
            ...userWithoutPassword,
            token
        };
    }
}

async function login({ email, password }) {
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

async function getAll() {
    return users.map(u => {
        const { password, ...userWithoutPassword } = u;
        return userWithoutPassword;
    });
}

async function getById(id) {
    const user = users.find(u => u.id === parseInt(id));
    if (!user) return;
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
}

module.exports = {
    authenticate,
    getAll,
    getById,
    login
};