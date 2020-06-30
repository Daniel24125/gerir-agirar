$(document).ready(function() {

  $(".inputContainer input").click(function () {
    $(this).prev().addClass("moveLabel");
  });

  $(".inputContainer input").focusout(function () {
    if ($(this).val() == "") {
      $(this).prev().removeClass("moveLabel");
    }
  });
  $(".btn-container").on("click", function() {
    var email = $("#email").val();
    var pass = $("#pass").val();
    var credentials = {
      "email": email,
      "password": pass
    }
    $(".btn-container h4").addClass("hide");
    $(".sub-loader").addClass("displayLoader");
    $.ajax({
      type: "POST",
      url: "/login",
      data: credentials,
      success: function(res) {
        $(".btn-container h4").removeClass("hide");
        $(".sub-loader").removeClass("displayLoader");
        if(res.error){
          $(".error").html(res.msg);
          $(".error-container").addClass("entrance").on("animationend",function(){
            $(this).removeClass("entrance");
          });
        }else{
          window.location.href = "../index.html";
        }
      },
      error: function (error) {
        $(".error").html(error);
          $(".error-container").addClass("entrance").on("animationend",function(){
            $(this).removeClass("entrance");
          });
      }
    });
  });


})
