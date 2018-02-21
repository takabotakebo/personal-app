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
  //データを送信
  send_osc.send('/reset',1);

  res.render('gender', { title: 'Gender' });
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

  console.log(receivedData);

  receivedData.createdAt = moment().format('YYYY-MM-DD HH:mm:ss');
  receivedData.createdAt = receivedData.createdAt.toString();

  console.log("Gender is : " + receivedData.gender);
  console.log("Created at : " + receivedData.createdAt);

  var query = 'INSERT INTO personaldatas (gender,height,weight,born_y,born_m,born_d,name_first,name_family,created_at) VALUES ("' + receivedData.gender + '", "0","0","0","0","0","0","0",' + '"' + receivedData.createdAt + '")';

  connection.query(query, function(err, rows) {
    if (err) {
      console.log(err);
      return;
    } else{
      console.log("Saved DB : " + receivedData.gender);
      var data = {"createdAt": receivedData.createdAt};

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
      res.send(data);
    }
  });

});


module.exports = router;
