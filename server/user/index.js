var express = require('express');
var router = express.Router();
var validator = require('express-validator');
router.use(validator());
var Auth = require('../../config/auth');

var usersController = require('./users_ctrl');


router.post('/login', function (req, res) {
    usersController.login(req, res);
});

router.post('/register', function (req, res) {
    usersController.register(req, res);
});

router.get('/getUserById/:id', Auth.isAuthenticated, function(req, res) {
    usersController.getUserById(req, res);
});

module.exports = router;
