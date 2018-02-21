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

  console.log("Height is : " + receivedData.height);
  console.log("DATETIME is : " + receivedData.createdAt);

  // update statment
  var query = 'UPDATE personaldatas SET height = "' + receivedData.height + '" WHERE created_at = "' + receivedData.createdAt + '"';

  connection.query(query, function(err, rows) {
    if (err) {
      console.log(err);
      return;
    } else{
      console.log("Saved DB height: " + receivedData.height);

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

      res.header('Content-Type', 'application/json; charset=utf-8')
      res.send(receivedData.height);
    }
  });


});

module.exports = router;
