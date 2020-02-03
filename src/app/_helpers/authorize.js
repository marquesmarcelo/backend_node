const expressJwt = require('express-jwt');

function authorize(roles = []) {
    // roles param can be a single role string (e.g. Role.User or 'User') 
    // or an array of roles (e.g. [Role.Admin, Role.User] or ['Admin', 'User'])
    if (typeof roles === 'string') {
        roles = [roles];
    }

    return [
        // authenticate JWT token and attach user to request object (req.user)
        expressJwt({ "secret": process.env.APP_SECRET }),

        // authorize based on user role
        (req, res, next) => {
            
            const retorno = roles.filter(value => req.user.role.includes(value))
            
            if (roles.length && !retorno.length) {
                // user's role is not authorized
                return res.status(401).json({ message: 'Não autorizado' });
            }

            // authentication and authorization successful
            next();
        }
    ];
}

module.exports = authorize;