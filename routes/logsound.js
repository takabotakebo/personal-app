var express = require('express');
var router = express.Router();
var moment = require('moment'); // DATETIME取得のモジュールのインポート
var connection = require('../mysqlConnection'); // mysqlの設定のインポート
const osc = require('node-osc');//OSC のインポート

//IPアドレスの指定
var ipAdrress = "localhost";
//OSCの送信先サーバを定義(4000番ポート)
var send_osc = new osc.Client(ipAdrress, 4000);

router.post('/', function(req, res, next) {
  var logId = req.body.data;

  console.log("LogID is : " + logId);

  // クエリ
  var query = 'SELECT * FROM personaldatas WHERE id = "' + logId + '"';

  connection.query(query, function(err, rows) {
    if (err) {
      console.log(err);
      return;
    } else{
      console.log(String(rows[0].name_family));

      //データを送信
      send_osc.send('/data',
        Number(rows[0].gender),
        Number(rows[0].height),
        Number(rows[0].weight),
        Number(rows[0].born_y),
        Number(rows[0].born_m),
        Number(rows[0].born_d),
        getStrokes(String(rows[0].name_first)),
        getStrokes(String(rows[0].name_family))
      );

      res.header('Content-Type', 'application/json; charset=utf-8')
      res.send(logId);
    }
  });


});

function getStrokes(text){
  if(text == false){
    var stroke = 0;
  }else {
    var textArray = text.split('');
    var stroke = [];

    for (var i = 0; i < textArray.length; i++) {
      switch ( textArray[i] ) {
        case "C":
        case "L":
        case "O":
        case "S":
        case "U":
            stroke.push(1);
            break;
        case "B":
        case "D":
        case "G":
        case "J":
        case "P":
        case "Q":
        case "T":
        case "V":
        case "X":
        case "Z":
            stroke.push(2);
            break;
        case "A":
        case "F":
        case "H":
        case "I":
        case "K":
        case "N":
        case "R":
        case "Y":
            stroke.push(3);
            break;
        case "E":
        case "M":
        case "W":
            stroke.push(4);
            break;
        default:
            console.log("ERROR");
            break;
      }
    }
  }

  return stroke;

}

module.exports = router;
