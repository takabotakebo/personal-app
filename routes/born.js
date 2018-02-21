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
  var receivedData = {
    gender : req.body.gender,
    height : req.body.height,
    weight : req.body.weight,
    born_y : req.body.born_y,
    born_m : req.body.born_m,
    born_d : req.body.born_d,
    firstname : req.body.firstname,
    familyname : req.body.familyname,
    createdAt : req.body.createdAt
  };

  console.log("YY is : " + receivedData.born_y);
  console.log("MM is : " + receivedData.born_m);
  console.log("DD is : " + receivedData.born_d);
  console.log("DATETIME is : " + receivedData.createdAt);

  // update statment
  var query = 'UPDATE personaldatas SET born_y = "' + receivedData.born_y + '", born_m = "' + receivedData.born_m + '" , born_d = "' + receivedData.born_d + '" WHERE created_at = "' + receivedData.createdAt + '"';

  connection.query(query, function(err, rows) {
    if (err) {
      console.log(err);
      return;
    } else{
      console.log("Saved DB born: " + receivedData.born_y);

      //データを送信
      send_osc.send('/data',
        Number(receivedData.gender),
        Number(receivedData.height),
        Number(receivedData.weight),
        Number(receivedData.born_y),
        Number(receivedData.born_m),
        Number(receivedData.born_d),
        Number(receivedData.firstname),
        Number(receivedData.familyname)
      );

      res.header('Content-Type', 'application/json; charset=utf-8');
      res.send(receivedData.born_y);
    }
  });


});


module.exports = router;
