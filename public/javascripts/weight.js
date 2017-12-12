console.log("DATETIME is :" + localStorage.getItem("createdAt"));

// APIにPOSTリクエストを送る
function postData(){
  console.log("Send Data as POST");

  //フォームの内容を取得する処理
  var answer = document.forms.mainform.weight.value;
  console.log("Answer is:" + answer);

  $.ajax(
    {
      url: "/weight",
      type:'POST',
      dataType: 'json',
      data : {
        data : answer,
        createdAt : localStorage.getItem("createdAt")
      },
      timeout:10000,
    }
  ).done(
    function(data) {
      console.log("It works");
      window.location.href = '/born';
    }
  ).fail(
    function(XMLHttpRequest, textStatus, errorThrown) {
      window.location.href = '/errorpage';
    }
  )

}
