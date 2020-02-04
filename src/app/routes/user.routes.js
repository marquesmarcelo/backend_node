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
* /users:
*   post:
*     tags:
*       - User
*     name: Create
*     summary: Criar um novo usuário
*     consumes:
*       - application/json
*     parameters:
*       - name: body
*         in: body
*         schema:     
*           type: object
*           $ref: '#/src/app/models/User.js'
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
router.post('/', UserController.create); // admin only

router.get('/:id', authorize(), UserController.getById);       // all authenticated users
router.put('/:id', UserController.update);
router.delete('/:id', UserController.delete); // admin only

router.post('/:user_id/roles', UserController.storeRole);

module.exports = router;