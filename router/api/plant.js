const models = require('../../models');
const express = require('express');
const router = express.Router();

router.post('/search', (req, res) => {
    const name = req.body.name;

    let params = {};
    if (name !== null && name !== '' && name !== undefined) {
        params = { where: { name: name }};
    }
    models.plant.findAll(params).then((result) => {
        if (result && result.length > 0) {
            res.status(200);
            res.json({
                plantList: result
            });
        } else {
            res.status(200);
            res.json({
                plantList: [],
            });
        }
    }).catch(err => {
        res.status(400);
        res.json({ message: err });
    });
});

router.post('/add', (req, res) => {
    models.plant.create({
        name: req.body.name,
        family: req.body.family,
        form: req.body.form,
        path: req.body.path,
    }).then((result) => {
            res.status(200);
            res.json({ message: 'success' });
    }).catch(err => {
        res.status(400);
        res.json(err);
    });
});

router.post('/update', (req, res) => {
    models.plant.update({
        name: req.body.name,
        family: req.body.family,
        form: req.body.form,
        path: req.body.path,
    }, {
        where: {
            RowKey: req.body.RowKey,
        }
    }).then((result) => {
            res.status(200);
            res.json({ message: 'success' });
    }).catch(err => {
        res.status(400);
        res.json(err);
    });
});

router.post('/delete', (req, res) => {
    models.plant.destroy({
        where: {
            RowKey: req.body.RowKey,
        },
    }).then((result) => {
            res.status(200);
            res.json({ message: 'success' });
    }).catch(err => {
        res.status(400);
        res.json(err);
    });
});

module.exports = router;