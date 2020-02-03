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
            //verificar interceção entre o vetor de roles informado e as permissões do usuário. 
            //Se o tamanho da interceção for igual a zero o usuário não tem permissão para acessar o recurso
            if (roles.length > 0 && !roles.filter(value => req.user.roles.includes(value)).length) {
                return res.status(401).json({ message: 'Usuário não possui a(as) permissão(ões) ' + roles + ' necessárias para acessar este recurso' });
            }

            // authentication and authorization successful
            next();
        }
    ];
}

module.exports = authorize;