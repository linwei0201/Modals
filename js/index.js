$(function($){
  $(".toast-btn").click(function(){
    $.toast("Loading...(2s自动消失)");
  });

  $(".alert-btn").click(function(){
    $.alert("警告内容", "警告标题：", function(){
      console.log("Alert Done!");
    });
  });

  $(".confirm-btn").click(function(){
    $.confirm("确认内容", "确认标题：", function(){
      $.confirm.hide();
      console.log("Confirm Pass!");
    });
  });

  $(".modal-btn").click(function(){
    $.modal({
      text: "弹窗内容",
      title: "弹窗标题：",
      btns: ['确定', '取消'],
      callback: function(){
        $.modal.hide();
        console.log("Modal Done!");
      }
    });
  });


})