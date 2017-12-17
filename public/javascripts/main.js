$(function() {

  $(document).ready(function() {
      // class'show'をdiv要素に追加
      $('#wrapper').addClass('show');
  });

  window.my = {};
  window.my.onkeypress = function() {
      var ENTER_KEY_CODE = 13;
      // ENTERが押下された場合、ソフトウェアキーボードを閉じる
      if (event.keyCode == ENTER_KEY_CODE) {
          document.activeElement.blur();
      }
      // ENTERが押下された時はfalseを返す。理由はPOSTリクエストを送信させないため。
      return event.keyCode != ENTER_KEY_CODE;
  }

  $("#wrapper").click(function(){
      $("inputname").blur();
  });

  $("#discription").on("click",function(){
      $('#discription').fadeOut(500);
  });

});
