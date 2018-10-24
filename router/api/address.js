const models = require('../../models');
const express = require('express');
const router = express.Router();

router.post('/upload', (req, res) => {
    res.status(200);
    res.json({ message: req.files });
});

router.post('/search', (req, res) => {
    var latitude = req.body.latitude;
    var longitude = req.body.longitude;

    var sql = "select abs(to_number(latitude, '99D999999') - ";
    sql = sql.concat(latitude);
    sql = sql.concat(") + abs(to_number(longitude, '999D999999') -");
    sql = sql.concat(longitude);
    sql = sql.concat(") as def, * from address order by def limit 1");
    models.sequelize.query(sql, { type: models.address }).then(function(address) {
        res.status(200);
        res.json({ address: address[0] });
    });

});

module.exports = router;