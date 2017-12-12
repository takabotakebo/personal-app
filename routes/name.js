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
  res.render('name', { title: 'Name' });
});

router.post('/', function(req, res, next) {
  var name = req.body.data;
  name = JSON.parse(name);
  var createdAt = req.body.createdAt;

  console.log(name);
  console.log("Firstname is : " + name.firstname + "    Steoke is : " + getStrokes(name.firstname));
  console.log("Familyname is : " + name.familyname + "    Steoke is : " + getStrokes(name.familyname));
  console.log("DATETIME is : " + createdAt);


  // update statment
  var query = 'UPDATE personaldatas SET name_first = "' + name.firstname + '", name_family = "' + name.familyname + '" WHERE created_at = "' + createdAt + '"';

  connection.query(query, function(err, rows) {
    if (err) {
      console.log(err);
      return;
    } else{
      console.log("Saved DB name: " + name);

      //データを送信
      send_osc.send('/name_first',getStrokes(name.firstname));
      send_osc.send('/name_family',getStrokes(name.familyname));

      res.header('Content-Type', 'application/json; charset=utf-8')
      res.send(name);
    }
  });


});


function getStrokes(text){
  var textArray = text.split('');
  var stroke = 0;

  for (var i = 0; i < textArray.length; i++) {
    switch ( textArray[i] ) {
      case "C":
      case "L":
      case "O":
      case "S":
      case "U":
          stroke = stroke + 1 ;
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
          stroke = stroke + 2 ;
          break;
      case "A":
      case "F":
      case "H":
      case "I":
      case "K":
      case "N":
      case "R":
      case "Y":
          stroke = stroke + 3 ;
          break;
      case "E":
      case "M":
      case "W":
          stroke = stroke + 4 ;
          break;
      default:
          console.log("ERROR");
          break;
    }
  }

  return stroke;

}



module.exports = router;
