console.log("DATETIME is :" + localStorage.getItem("createdAt"));

// APIにPOSTリクエストを送る
function postData(){
  console.log("Send Data as POST");

  //フォームの内容を取得する処理
  var answer = {
    "born_y" : document.forms.mainform.bornY.value,
    "born_m" : document.forms.mainform.bornM.value,
    "born_d" : document.forms.mainform.bornD.value
  };
  answer = JSON.stringify(answer);

  console.log("Answer is:" + JSON.stringify(answer));

  $.ajax(
    {
      url: "/born",
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
      window.location.href = '/name';
    }
  ).fail(
    function(XMLHttpRequest, textStatus, errorThrown) {
      window.location.href = '/errorpage';
    }
  )

}
