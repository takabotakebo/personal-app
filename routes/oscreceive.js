const osc = require('node-osc');

//IPアドレスの指定
let provider_ip = "localhost";

//OSCのサーバを定義
let oscServer = new osc.Server(4000,provider_ip);

//OSCで受信したデータに応じて処理を実行
oscServer.on("message", function (msg, rinfo) {
   console.log(msg);
});
