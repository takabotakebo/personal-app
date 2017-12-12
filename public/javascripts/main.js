// APIにPOSTリクエストを送る
function postData(path,answer,nextpath){
  console.log("Send Data as POST");
  console.log("Path is:" + path);
  console.log("Answer is:" + answer);
  console.log("Go to:" + nextpath);

  $.ajax(
    {
      url: "/" + path,
      type:'POST',
      dataType: 'json',
      data : {data : answer},
      timeout:10000,
    }
  ).done(
    function(data) {
      console.log("It works");
      window.location.href = '/' + nextpath;
    }
  ).fail(
    function(XMLHttpRequest, textStatus, errorThrown) {
      alert("error");
    }
  )

}
