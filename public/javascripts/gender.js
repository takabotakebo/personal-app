localStorage.clear();

console.log("DELETE LOCALSTRAGE");

localStorage.setItem("gender",0);
localStorage.setItem("height",0);
localStorage.setItem("weight",0);
localStorage.setItem("born_y",0);
localStorage.setItem("born_m",0);
localStorage.setItem("born_d",0);
localStorage.setItem("firstname",0);
localStorage.setItem("familyname",0);
localStorage.setItem("createdAt",0);

// APIにPOSTリクエストを送る
function postData(answer){
  console.log("Send Data as POST");
  console.log("Answer is:" + answer);
  localStorage.setItem('gender', answer);

  $.ajax(
    {
      url: "/gender",
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
      localStorage.setItem('createdAt', data.createdAt);
      console.log("DATETIME is :" + localStorage.getItem("createdAt"));
      window.location.href = '/height';
    }
  ).fail(
    function(XMLHttpRequest, textStatus, errorThrown) {
      window.location.href = '/errorpage';
    }
  )

}
