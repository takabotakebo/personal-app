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
  var endAt = moment().format('YYYY-MM-DD HH:mm:ss');

  // //大文字に変換
  // name.firstname = name.firstname.toUpperCase();
  // name.familyname = name.familyname.toUpperCase();

  console.log("Firstname is : " + receivedData.firstname + "    Steoke is : " + getStrokes(receivedData.firstname));
  console.log("Familyname is : " + receivedData.familyname + "    Steoke is : " + getStrokes(receivedData.familyname));
  console.log("DATETIME is : " + receivedData.createdAt);
  console.log("End At:" + endAt);


  // update statment
  var query = 'UPDATE personaldatas SET name_first = "' + receivedData.firstname + '", name_family = "' + receivedData.familyname + '", end_at = "'+ endAt + '" WHERE created_at = "' + receivedData.createdAt + '"';

  connection.query(query, function(err, rows) {
    if (err) {
      console.log(err);
      return;
    } else{
      console.log("Saved DB name: " + receivedData.firstname);

      //データを送信
      send_osc.send('/data',
        Number(receivedData.gender),
        Number(receivedData.height),
        Number(receivedData.weight),
        Number(receivedData.born_y),
        Number(receivedData.born_m),
        Number(receivedData.born_d),
        getStrokes(receivedData.firstname),
        getStrokes(receivedData.familyname)
      );

      res.header('Content-Type', 'application/json; charset=utf-8');
      res.send(receivedData.gender);
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
