const models = require('../../models');
const express = require('express');
const router = express.Router();

router.get('/search', (req, res) => {
    // セッションから値を読み込みます.
    // ここではJavaScriptのオブジェクトをセッションに入れています.
    let user = req.session.user || { prevAccess : null, pv : 1 };

    // 前回のアクセス日時
    let prevAccess = user.prevAccess;

    // ユーザーごとのPageView
    let pv = user.pv;

    // 今回アクセス分を更新して、セッションに保存します.
    user.pv += 1;
    user.prevAccess = new Date();
    req.session.user = user;

    models.user2.findAll({ where: { name: 'aaaa' }}).then((result) => {
        if (result && result.length > 0) {
            res.status(200);
            res.json({ generalList: result});
        } else {
            res.status(200);
            res.json({
                generalList: [],
                user,
            });
        }
    }).catch(err => {
        res.status(400);
        res.json({ message: err });
    });
});

router.post('/add', (req, res) => {
    models.user2.create({
        name: req.body.name,
        birth: req.body.birth,
        country_code: req.body.code,
    }).then((result) => {
            res.status(200);
            res.json({ message: 'success' });
    }).catch(err => {
        res.status(400);
        res.json(err);
    });
});

module.exports = router;