const express = require('express');
var path = require('path');
const router = express.Router();

router.get('/', function(req, res) {
    res.sendFile(path.resolve(__dirname, '../www/chat/index.html'));
});

module.exports = router;
