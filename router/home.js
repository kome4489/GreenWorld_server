const express = require('express');
var path = require('path');
const router = express.Router();

router.get('/', function(req, res) {
    let userId = req.session.userId;
    if (userId !== undefined) {
        req.session.userId = userId;
        res.sendFile(path.resolve(__dirname, '../www/home/index.html'));
    } else {
        res.redirect('/login');
    }
});

module.exports = router;
