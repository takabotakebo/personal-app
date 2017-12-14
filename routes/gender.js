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
  var gender = req.body.data;
  var createdAt = moment().format('YYYY-MM-DD HH:mm:ss');
  createdAt = createdAt.toString();

  console.log("Gender is : " + gender);
  console.log("Created at : " + createdAt);

  var query = 'INSERT INTO personaldatas (gender,height,weight,born_y,born_m,born_d,name_first,name_family,created_at) VALUES ("' + gender + '", "0","0","0","0","0","0","0",' + '"' + createdAt + '")';

  connection.query(query, function(err, rows) {
    if (err) {
      console.log(err);
      return;
    } else{
      console.log("Saved DB : " + gender);
      var data = {"createdAt": createdAt}

      //データを送信
      send_osc.send('/gender',Number(gender));

      res.header('Content-Type', 'application/json; charset=utf-8');
      res.send(data);
    }
  });

});


module.exports = router;
