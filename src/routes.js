const routes = require('express').Router();

const authMiddleware = require('./app/middleware/auth');

const SessionController = require('./app/controllers/SessionController')

const UserController = require('./app/controllers/UserController')
const RoleController = require('./app/controllers/RoleController')
const CidadeController = require('./app/controllers/CidadeController')
const EstadoController = require('./app/controllers/EstadoController')

//Query Params: request.query (filtros, ordenação, paginação, ...)
//Route Params: request.params (identificar um recurso na alteração ou remoção)
//Body: request.body (dados para criação ou alteração de um registro)

//Rotas
routes.get('/', (request, response) => {
    console.log(request.query);
    return response.json({ message: 'App Backend em Node.js' })
});



routes.post('/sessions', SessionController.login);

routes.get('/api/users', UserController.index);
routes.get('/api/users/:id', UserController.getById);
routes.post('/api/users', UserController.store);
routes.put('/api/users/:id', UserController.update);
routes.delete('/api/users/:id', UserController.delete);

routes.post('/api/users/:user_id/roles', UserController.storeRole);

routes.get('/api/cidades', CidadeController.index);
routes.post('/api/cidades', CidadeController.store);

routes.get('/api/estados', EstadoController.index);
routes.post('/api/estados', EstadoController.store);
routes.post('/api/estados/:estado_id/cidades', EstadoController.storeCidade);

routes.get('/api/roles', RoleController.index);
routes.get('/api/roles/:id', RoleController.getById);
routes.post('/api/roles', RoleController.store);
routes.put('/api/roles/:id', RoleController.update);
routes.delete('/api/roles/:id', RoleController.delete);

//Abaixo desta linha deve ficar as rotas que exigem autenticacao
routes.use(authMiddleware);

routes.get('/dashboard', (req, res) => {
    return res.status(200).send();
});

module.exports = routes;