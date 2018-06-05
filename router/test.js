const express = require('express');
var path = require('path');
const router = express.Router();

router.get('/', function(req, res) {
    res.sendFile(path.resolve(__dirname, '../www/test/index.html'));
});

module.exports = router;
