console.log("DATETIME is :" + localStorage.getItem("createdAt"));

// APIにPOSTリクエストを送る
function postData(){
  console.log("Send Data as POST");

  //フォームの内容を取得する処理
  var answer = {
    "firstname" : document.forms.mainform.firstname.value,
    "familyname" : document.forms.mainform.familyname.value
  };
  answer = JSON.stringify(answer);

  console.log("Answer is:" + JSON.stringify(answer));

  $.ajax(
    {
      url: "/name",
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
      localStorage.removeItem("createdAt");
      window.location.href = '/';
    }
  ).fail(
    function(XMLHttpRequest, textStatus, errorThrown) {
      window.location.href = '/errorpage';
    }
  )

}
