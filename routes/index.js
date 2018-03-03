var express = require('express');
var router = express.Router();
var moment = require('moment'); // DATETIME取得のモジュールのインポート
var connection = require('../mysqlConnection'); // mysqlの設定のインポート
const osc = require('node-osc');//OSC のインポート

//IPアドレスの指定
var ipAdrress = "localhost";
//OSCの送信先サーバを定義(4000番ポート)
var send_osc = new osc.Client(ipAdrress, 4000);

/* GET home page. */
router.get('/', function(req, res, next) {
  var query = 'SELECT * FROM personaldatas ORDER by id DESC LIMIT 5';

  connection.query(query, function(err, rows) {
    console.log(rows);
    res.render('index', {
      title: 'Express' ,
      answerList: rows
    });
  });

});


router.post('/', function(req, res, next) {
  var data = req.body.data;

  //データを送信
  send_osc.send('/startstop',Number(data));

  res.header('Content-Type', 'application/json; charset=utf-8');
  res.send(data);

});
module.exports = router;
