const express = require('express');
const router = express.Router();

const user = require('./api/user');
router.use('/user', user);

const home = require('./api/home');
router.use('/home', home);

module.exports = router;
