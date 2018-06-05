const express = require('express');
const jwt = require('jsonwebtoken');
const models = require('../models');
const router = express.Router();

router.use((req, res, next) => {
    var ApiToken = req.session.token;
    var AuthHeader = req.headers['authorization'];

    if (ApiToken !== undefined) {
        jwt.verify(ApiToken, app.get('apiSecret'), function(err, decoded) {
            if (err) {
              return res.json({
                success: false,
                message: 'Invalid token'
              });
            }

            // if token valid -> save token to request for use in other routes
            req.decoded = decoded;
            next();
        }); 
    } else if (ApiToken === undefined && AuthHeader !== undefined) {
        var token = AuthHeader.split(/\s+/).pop() || '';
        // and the encoded auth token
        var Auth=new Buffer.from(token, 'base64').toString();
        // convert from base64
        var parts=Auth.split(/:/);
        // split on colon
        var username=parts[0];
        var password=parts[1];

        models.user.findOne({
            where: {
                userId: username,
                password: password,
            }
        }).then((result) => {
            if (result) {
                next();
            } else {
                return res.json({
                    success: false,
                    message: 'Invalid login'
                  });
            }
        }).catch(err => {
            return res.json({
                success: false,
                message: 'Invalid login'
              });
        });
    } else {
        return res.json({
            success: false,
            message: 'Invalid auth'
        });
    }
});

const user = require('./api/user');
router.use('/user', user);

const home = require('./api/home');
router.use('/home', home);

const plant = require('./api/plant');
router.use('/plant', plant);

module.exports = router;
