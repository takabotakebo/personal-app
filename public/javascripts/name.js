console.log("DATETIME is :" + localStorage.getItem("createdAt"));

// APIにPOSTリクエストを送る
function postData(){
  console.log("Send Data as POST");

  //フォームの内容を取得する処理
  var answer = {
    "firstname" : document.forms.mainform.firstname.value,
    "familyname" : document.forms.mainform.familyname.value
  };

  //大文字に変換してlocalStoregeへ
  localStorage.setItem("firstname",answer.firstname.toUpperCase());
  localStorage.setItem("familyname",answer.familyname.toUpperCase());

  $.ajax(
    {
      url: "/name",
      type:'POST',
      dataType: 'json',
      data : {
        gender : localStorage.getItem("gender"),
        height : localStorage.getItem("height"),
        weight : localStorage.getItem("weight"),
        born_y : localStorage.getItem("born_y"),
        born_m : localStorage.getItem("born_m"),
        born_d : localStorage.getItem("born_d"),
        firstname : localStorage.getItem("firstname"),
        familyname : localStorage.getItem("familyname"),
        createdAt : localStorage.getItem("createdAt")
      },
      timeout:10000,
    }
  ).done(
    function(data) {
      console.log("It works");
      window.location.href = '/';
    }
  ).fail(
    function(XMLHttpRequest, textStatus, errorThrown) {
      window.location.href = '/errorpage';
    }
  )

}
