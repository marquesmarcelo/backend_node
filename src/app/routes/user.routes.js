const router =  require('express').Router();
const UserController = require('../controllers/users.controller');

const authorize = require('../_helpers/authorize')

// routes
//Rota para testes
router.get('/dashboard', authorize(), (req, res) => {
    return res.status(200).send();
});

//Rota da aplicação
router.post('/authenticate', UserController.authenticate);     // public route
router.get('/', authorize(['ROLE_USER']), UserController.getAll); // admin only
router.post('/', UserController.store); // admin only

router.get('/:id', authorize(), UserController.getById);       // all authenticated users
router.put('/:id', UserController.update);
router.delete('/:id', UserController.deleteObj); // admin only

router.post('/:user_id/roles', UserController.storeRole);

module.exports = router;