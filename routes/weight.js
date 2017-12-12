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
  res.render('weight', { title: 'Weight' });
});


router.post('/', function(req, res, next) {
  var weight = req.body.data;
  var createdAt = req.body.createdAt;
  console.log("Weight is : " + weight);
  console.log("DATETIME is : " + createdAt);

  // update statment
  var query = 'UPDATE personaldatas SET weight = "' + weight + '" WHERE created_at = "' + createdAt + '"';

  connection.query(query, function(err, rows) {
    if (err) {
      console.log(err);
      return;
    } else{
      console.log("Saved DB weight: " + weight);

      //データを送信
      send_osc.send('/weight',weight);

      res.header('Content-Type', 'application/json; charset=utf-8')
      res.send(weight);
    }
  });



});


module.exports = router;
