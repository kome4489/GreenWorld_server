var express = require('express');
// express-sessionを読み込む
var session = require('express-session');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var path = require('path');
var models = require('./models');
var config = require('./config/config');

app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cookieParser());

// application variables
app.set('apiSecret', config.apiSecret);

app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://www.silvereye.work');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

// セッションの設定を行います.
app.use(session({
    // 必須項目（署名を行うために使います）
    secret : app.get('apiSecret'), 
    // 推奨項目（セッション内容に変更がない場合にも保存する場合にはtrue）
    resave : false,               
    // 推奨項目（新規にセッションを生成して何も代入されていなくても値を入れる場合にはtrue）
    saveUninitialized : true,                
    // アクセスの度に、有効期限を伸ばす場合にはtrue
    rolling : true,
    // クッキー名（デフォルトでは「connect.sid」）
    name : 'sessionId',
    // 一般的なCookie指定
    cookie: {
        // domain:'.silvereye.work',
        // path: '/api',
        httpOnly: true,
        secure: false,
        // 生存期間（単位：ミリ秒）
        maxAge : 1000 * 60 * 60 * 24 * 30, // 30日
    }
}));

const router = express.Router();

const api = require('./router/api');
router.use('/api', api);

const home = require('./router/home');
router.use('/home', home);

const login = require('./router/login');
router.use('/login', login);

const chat = require('./router/chat');
router.use('/chat', chat);

const test = require('./router/test');
router.use('/test', test);

app.use('/', router);

app.use(express.static('www'));
app.get('/', function(req, res) {
    if (req.session !== undefined && req.session.userId !== undefined) {
        var userId = req.session.userId;
        res.redirect('/home');
    } else {
        res.redirect('/login');
    }
});

// app.get('/', (req, res) => {

//     // セッションから値を読み込みます.
//     // ここではJavaScriptのオブジェクトをセッションに入れています.
//     let user = req.session.user || { prevAccess : null, pv : 1 };

//     // 前回のアクセス日時
//     let prevAccess = user.prevAccess;

//     // ユーザーごとのPageView
//     let pv = user.pv;

//     // 今回アクセス分を更新して、セッションに保存します.
//     user.pv += 1;
//     user.prevAccess = new Date();
//     req.session.user = user;

//     // レスポンス返却
//     res.send(`Hello from express4! pv=${pv}, prevAccess=${prevAccess}`);
// });

models.sequelize.sync().then(() => {
    app.listen(8000, () => {
        console.log('App listening on port 8000.');
    });
});
