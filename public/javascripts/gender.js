// APIにPOSTリクエストを送る
function postData(answer){
  console.log("Send Data as POST");
  console.log("Answer is:" + answer);

  $.ajax(
    {
      url: "/gender",
      type:'POST',
      dataType: 'json',
      data : {data : answer},
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
