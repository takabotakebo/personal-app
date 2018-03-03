console.log("DATETIME is :" + localStorage.getItem("createdAt"));

// APIにPOSTリクエストを送る
function postData(){
  console.log("Send Data as POST");

  //フォームの内容を取得する処理
  var answer = document.querySelector('.rangeweight').value;
  console.log("Answer is:" + answer);
  localStorage.setItem("weight",answer);
  $.ajax(
    {
      url: "/weight",
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
      window.location.href = '/born';
    }
  ).fail(
    function(XMLHttpRequest, textStatus, errorThrown) {
      window.location.href = '/errorpage';
    }
  )

}


// APIにPOSTリクエストを送る
function postDataSkip(){
  console.log("Send Data as POST");

  console.log("Answer is:SKIP");
  $.ajax(
    {
      url: "/weight",
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
      window.location.href = '/born';
    }
  ).fail(
    function(XMLHttpRequest, textStatus, errorThrown) {
      window.location.href = '/errorpage';
    }
  )

}
