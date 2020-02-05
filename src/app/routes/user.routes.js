const router =  require('express').Router();
const UserController = require('../controllers/users.controller');

const authorize = require('../_helpers/authorize')

// routes
//Rota para testes
router.get('/dashboard', authorize(), (req, res) => {
    return res.status(200).send();
});

//Rota da aplicação
//router.post('/authenticate', SessionController.authenticate);     // public route
router.get('/', authorize(['ROLE_USER']), UserController.getAll); // admin only

/**
* @swagger
* paths:
*   /users:
*     post:
*       tags:
*       - "users"
*       summary: "Adicionar um novo usuario"
*       description: ""
*       operationId: "create"
*       consumes:
*       - "application/json"
*       produces:
*       - "application/json"
*       parameters:
*       - in: "body"
*         name: "body"
*         description: "Objeto necessário para adicionar um novo usuário"
*         required: true
*         schema:
*           $ref: "#/definitions/User"
*       responses:
*         405:
*           description: "Informações invalidas"
*         400:
*           description: "Requisição invalida"
*         401:
*           description: "Token invalido"
*       security:
*       - backend_auth:
*         - "ROLE_ADMIN"
*         - "read:users"
*/
router.post('/', UserController.create); // admin only
/**
* @swagger
* paths:
*   /users/{userId}:
*     get:
*       tags:
*       - "users"
*       summary: "Buscar um usuario a partir de um id informado"
*       description: ""
*       operationId: "getById"
*       consumes:
*       - "application/json"
*       produces:
*       - "application/json"
*       parameters:
*       - name: "userId"
*         in: "path"
*         description: "ID de um usuário"
*         required: true
*         type: "integer"
*         format: "int64"
*       responses:
*         200:
*           description: "successful operation"
*           schema:
*             $ref: "#/definitions/User"
*         405:
*           description: "Informações invalidas"
*         400:
*           description: "Requisição invalida"
*       security:
*       - backend_auth:
*         - "ROLE_ADMIN"
*         - "read:users"
*/
router.get('/:id', authorize(), UserController.getById);       // all authenticated users
router.put('/:id', UserController.update);
router.delete('/:id', UserController.delete); // admin only

router.post('/:user_id/roles', UserController.storeRole);

module.exports = router;