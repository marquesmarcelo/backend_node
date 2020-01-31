const express = require('express');
const router = express.Router();
const userService = require('../services/user.service');

const authorize = require('../_helpers/authorize')
const Role = require('../_helpers/role');

// routes
router.post('/authenticate', authenticate);     // public route
router.get('/', authorize(['teste','admin']), getAll); // admin only
router.get('/:id', authorize(), getById);       // all authenticated users

module.exports = router;

function authenticate(req, res, next) {
    userService.login(req.body)
        .then(user => user ? res.json(user) : res.status(400).json({ message: 'Nome de usuário ou senha incorreto' }))
        .catch(err => next(err));
}

function getAll(req, res, next) {
    userService.getAll()
        .then(users => res.json(users))
        .catch(err => next(err));
}

function getById(req, res, next) {
    const currentUser = req.user;
    const id = parseInt(req.params.id);

    // only allow admins to access other user records
    if (id !== currentUser.sub && currentUser.role !== Role.Admin) {
        return res.status(401).json({ message: 'Não autorizado' });
    }

    userService.getById(req.params.id)
        .then(user => user ? res.json(user) : res.sendStatus(404))
        .catch(err => next(err));
}