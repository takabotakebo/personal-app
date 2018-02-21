console.log("DATETIME is :" + localStorage.getItem("createdAt"));

// APIにPOSTリクエストを送る
function postData(){
  console.log("Send Data as POST");

  //フォームの内容を取得する処理
  var answer = {
    "born_y" : document.querySelector('.rangedateY').value,
    "born_m" : document.querySelector('.rangedateM').value,
    "born_d" : document.querySelector('.rangedateD').value
  };

  localStorage.setItem("born_y",answer.born_y);
  localStorage.setItem("born_m",answer.born_m);
  localStorage.setItem("born_d",answer.born_d);

  $.ajax(
    {
      url: "/born",
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
      window.location.href = '/name';
    }
  ).fail(
    function(XMLHttpRequest, textStatus, errorThrown) {
      window.location.href = '/errorpage';
    }
  )

}
