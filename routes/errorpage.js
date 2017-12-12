var express = require('express');
var router = express.Router();
var moment = require('moment'); // DATETIME取得のモジュールのインポート
var connection = require('../mysqlConnection'); // mysqlの設定のインポート

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('errorpage', { title: 'ERROR' });
});

module.exports = router;
