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
  res.render('height', { title: 'Height' });
});


router.post('/', function(req, res, next) {
  var height = req.body.data;
  var createdAt = req.body.createdAt;
  console.log("Height is : " + height);
  console.log("DATETIME is : " + createdAt);

  // update statment
  var query = 'UPDATE personaldatas SET height = "' + height + '" WHERE created_at = "' + createdAt + '"';

  connection.query(query, function(err, rows) {
    if (err) {
      console.log(err);
      return;
    } else{
      console.log("Saved DB height: " + height);

      //データを送信
      send_osc.send('/height',height);

      res.header('Content-Type', 'application/json; charset=utf-8')
      res.send(height);
    }
  });


});

module.exports = router;
