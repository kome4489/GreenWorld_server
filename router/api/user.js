const models = require('../../models');
const express = require('express');
const router = express.Router();

router.post('/search', (req, res) => {
    const userId = req.body.userId;
    models.user.findAll({ where: { userId: userId }}).then((result) => {
        if (result && result.length > 0) {
            res.status(200);
            res.json({
                userList: result
            });
        } else {
            res.status(200);
            res.json({
                userList: [],
            });
        }
    }).catch(err => {
        res.status(400);
        res.json({ message: err });
    });
});

router.post('/add', (req, res) => {
    models.user.create({
        userId: req.body.userId,
        password: req.body.password,
        groupId: req.body.groupId,
        typeId: req.body.typeId,
        roleId: req.body.roleId,
    }).then((result) => {
            res.status(200);
            res.json({ message: 'success' });
    }).catch(err => {
        res.status(400);
        res.json(err);
    });
});

router.post('/update', (req, res) => {
    models.user.update({
        password: req.body.password,
        groupId: req.body.groupId,
        typeId: req.body.typeId,
        roleId: req.body.roleId,
    }, {
        where: {
            userId: req.body.userId,
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
    models.user.destroy({
        where: {
            userId: req.body.userId,
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