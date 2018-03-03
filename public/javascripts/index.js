// APIにPOSTリクエストを送る
function postDataStop(){
  console.log("Send Data as POST");

  //フォームの内容を取得する処理
  var answer = 0;
  console.log("Answer is:" + answer);

  $.ajax(
    {
      url: "/",
      type:'POST',
      dataType: 'json',
      data : {
        data : answer
      },
      timeout:10000,
    }
  ).done(
    function(data) {
      console.log("It works");
      $('.stopbutton').hide(50);
      $('.startbutton').show(50);

    }
  ).fail(
    function(XMLHttpRequest, textStatus, errorThrown) {
      window.location.href = '/errorpage';
    }
  )

}

function postDataStart(){
  console.log("Send Data as POST");

  //フォームの内容を取得する処理
  var answer = 1;
  console.log("Answer is:" + answer);

  $.ajax(
    {
      url: "/",
      type:'POST',
      dataType: 'json',
      data : {
        data : answer
      },
      timeout:10000,
    }
  ).done(
    function(data) {
      console.log("It works");
      $('.startbutton').hide(50);
      $('.stopbutton').show(50);
    }
  ).fail(
    function(XMLHttpRequest, textStatus, errorThrown) {
      window.location.href = '/errorpage';
    }
  )

}


// APIにPOSTリクエストを送る
function postDataLog(logNum){
  console.log("Send Data as POST");
  console.log("LogNum is:" + logNum);

  $.ajax(
    {
      url: "/logsound",
      type:'POST',
      dataType: 'json',
      data : {
        data : logNum
      },
      timeout:10000,
    }
  ).done(
    function(data) {
      console.log("It works");
    }
  ).fail(
    function(XMLHttpRequest, textStatus, errorThrown) {
      window.location.href = '/errorpage';
    }
  )

}
