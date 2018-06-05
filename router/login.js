const express = require('express');
const path = require('path');
const jwt = require('jsonwebtoken');
const router = express.Router();
const models = require('../models');

router.get('/', function(req, res) {
    res.sendFile(path.resolve(__dirname, '../www/login/index.html'));
});

router.post('/', function(req, res) {
    const userId = req.body.userId;
    const password = req.body.password;

    models.user.findOne({
        where: {
            userId: userId,
            password: password,
        },
    }).then((result) => {
        if (result) {
            req.session.userId = userId;

            var user = {
                userId: userId,
                password: password,
            }
            var token = jwt.sign(user, app.get('apiSecret'), {
                expiresIn: '24h'
              });

            res.setHeader('x-access-token', token);

            req.session.token = token;

            res.redirect('/home');
        } else {
            res.redirect('/login');
        }
    }).catch(err => {
        console.log(err);
        res.redirect('/login');
    });
});

module.exports = router;
