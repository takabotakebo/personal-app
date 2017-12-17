var express = require('express');
var router = express.Router();
const osc = require('node-osc');//OSC のインポート

//IPアドレスの指定
var ipAdrress = "localhost";
//OSCの送信先サーバを定義(4000番ポート)
var send_osc = new osc.Client(ipAdrress, 4000);

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


router.post('/', function(req, res, next) {
  var data = req.body.data;

  //データを送信
  send_osc.send('/startstop',Number(data));

  res.header('Content-Type', 'application/json; charset=utf-8');
  res.send(data);

});
module.exports = router;
