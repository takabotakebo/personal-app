console.log("DATETIME is :" + localStorage.getItem("createdAt"));

// APIにPOSTリクエストを送る
function postData(){
  console.log("Send Data as POST");

  //フォームの内容を取得する処理
  var answer = document.querySelector('.rangeheight').value;
  console.log("Answer is:" + answer);
  localStorage.setItem("height",answer);
  $.ajax(
    {
      url: "/height",
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
      window.location.href = '/weight';
    }
  ).fail(
    function(XMLHttpRequest, textStatus, errorThrown) {
      window.location.href = '/errorpage';
    }
  )

}

// スキップの場合
// APIにPOSTリクエストを送る
function postDataSkip(){
  console.log("Send Data as POST");

  console.log("Answer is: SKIP");

  $.ajax(
    {
      url: "/height",
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
      window.location.href = '/weight';
    }
  ).fail(
    function(XMLHttpRequest, textStatus, errorThrown) {
      window.location.href = '/errorpage';
    }
  )

}
