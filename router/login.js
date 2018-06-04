const express = require('express');
var path = require('path');
const router = express.Router();
const models = require('../models');

router.get('/', function(req, res) {
    res.sendFile(path.resolve(__dirname, '../www/login/index.html'));
});

router.post('/', function(req, res) {
    const userId = req.body.userId;
    const password = req.body.password;

    models.user.findAll({
        where: {
            userId: userId,
            password: password,
        }}).then((result) => {
        if (result && result.length > 0) {
            req.session.userId = userId;
            res.redirect('/home');
        } else {
            res.render('/login', {
                userId: userId,
                password: '',
                message: 'fail',
            });
        }
    }).catch(err => {
        res.redirect('/login');
    });
});

module.exports = router;
