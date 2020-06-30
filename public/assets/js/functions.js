$(document).ready(function () {
  let menuClicked = false;
  let navWidth = parseFloat($(".navContainer").css("width"));
  let w = window.innerWidth;
  let h = window.innerHeight;
  let headerHeight = parseFloat($(".headerContainer").css("height"));
  $("iframe").css("height",h-headerHeight+"px")
  $(".menuIconContainer").click(function () {
    if (menuClicked == false) { 
      openNav();
    } else {
      closeNav();
    }
  });

  $(".navContainer li").click(function(){
    $(".active").removeClass("active");
    $(this).addClass("active");

    $("iframe").attr("src",$(".active").attr("id")+".html");
    closeNav();
  });

  $(".logoutBtnContainer").click(function() {
    $.ajax({
      type: "POST",
      url: "/logout",
      success: function() {
        window.location.href = "log/login.html";
      }
    });
  });

  $(".informationBtnContainer").click(function(){
    $(".informationDialogContainer").removeClass("hide");
    $(".blackBackground").css({
      "opacity": "0.6",
      "visibility": "visible"
    });
  }); 

  $(".infoTabsContainer li").click(function(){
    $(".tabSelected").removeClass("tabSelected");
    $(this).addClass("tabSelected");
  });

  $(".closeInfoDialog").click(function(){
    $(".informationDialogContainer").addClass("hide");
    $(".blackBackground").css({
      "opacity": "0",
      "visibility": "hidden"
    });
  });

  $(".infoTabsContainer li").click(function(){
    let selectedTab = $(this).attr("id");
    $(".tabContent").addClass("hide");
    $("."+selectedTab).removeClass("hide");
  });

    function openNav() {
    $(".lineTop").css({
      "top": "50%",
      "transform": "translate(-50%, -50%) rotate(-45deg)"
    });
    $(".lineCenter").css({
      "opacity": 0
    });
    $(".lineBottom").css({
      "top": "50%",
      "transform": "translate(-50%, -50%) rotate(45deg)"
    });
    $(".navContainer").css("left", "0");
    $(".headerContainer").css({
      "left": navWidth + "px",
      "width": w - navWidth + "px"
    });
    menuClicked = true;
    
  }

  function closeNav() {
    $(".lineTop").css({
      "top": "39%",
      "transform": "translateX(-50%) rotate(0deg)"
    });
    $(".lineCenter").css({
      "opacity": 1
    });
    $(".lineBottom").css({
      "top": "61%",
      "transform": "translateX(-50%) rotate(0deg)"
    });
    $(".navContainer").css("left", "-" + navWidth + "px");
    $(".headerContainer").css({
      "left": "0",
      "width": "100%"
    });
    menuClicked = false;    
  }
});