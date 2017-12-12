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
  res.render('born', { title: 'Born' });
});

router.post('/', function(req, res, next) {
  var born = req.body.data;
  var createdAt = req.body.createdAt;
  born = JSON.parse(born);
  console.log(born);
  console.log("YY is : " + born.born_y);
  console.log("MM is : " + born.born_m);
  console.log("DD is : " + born.born_d);
  console.log("DATETIME is : " + createdAt);

  // update statment
  var query = 'UPDATE personaldatas SET born_y = "' + born.born_y + '", born_m = "' + born.born_m + '" , born_d = "' + born.born_d + '" WHERE created_at = "' + createdAt + '"';

  connection.query(query, function(err, rows) {
    if (err) {
      console.log(err);
      return;
    } else{
      console.log("Saved DB born: " + born);

      //データを送信
      send_osc.send('/born_y',born.born_y);
      send_osc.send('/born_m',born.born_m);
      send_osc.send('/born_d',born.born_d);

      res.header('Content-Type', 'application/json; charset=utf-8')
      res.send(born);
    }
  });


});


module.exports = router;
