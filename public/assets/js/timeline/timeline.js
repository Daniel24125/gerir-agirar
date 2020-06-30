$(document).ready(function () {
  let timeList, keys, bulk, options;
 
  $.ajax({
    method: "get",
    url: "/getTimeline",
    async: false,
    success: function (data) {
      timeList = data.timeline;
      keys = data.keys
      bulk = data.bulkData;
      options = data.options;
    },
    error: function (error) {
      console.log(error);
    }
  });

  timeList.map((item) => {
   addTime(item);
  });
  $(".loadingContainer").addClass("hide")
  let mouseX, left, down;
  let listWidth,
  elementWidth = parseFloat($(".historyListContainer .listItemContainer").css("width"));
  calculateStats();

  // DRAG SCROLL
  $(".historyContainer").mousedown(function (e) {
    down = true;
    x = e.pageX;
    left = $(this).scrollLeft();
  });

  $(".historyContainer").mousemove(function (e) {
    if (down) {
      var newX = e.pageX;
      $(".historyContainer").scrollLeft(left - newX + x);
    }
  });

  $(".historyContainer").mouseup(function (e) {
    down = false;
  });

  $(".totalVisibleCards").html(options.visible);
  $("body").on("click",".editVisibleCards",function () {
    $(".statContent").addClass("hideComponent").on("transitionend", function(){
      $(this).html(`
      <input type="text" name="visibleCards" id="visibleCards">
      <span class="saveVisibleCards fa fa-floppy-o"></span>
      <span class="cancelVisibleCards fa fa-times"></span>
    `).removeClass("hideComponent");
    });
  });

  $("body").on("click", ".saveVisibleCards", function () {
    if($("#visibleCards").val()==""){
      $(".errorMessage .msg").html("Por favor coloque o número de marcos que deseja exibir!")
      showErrorMessage();
      $("#visibleCards").addClass("visibleInputEmpty")
    }else if (parseFloat($("#visibleCards").val())>timeList.length){
      $(".errorMessage .msg").html("O número que colocou excede o total de marcos")
      showErrorMessage();
      $("#visibleCards").addClass("visibleInputEmpty")
    }else{
        $.ajax({
        method: "post",
        url: "/updateVisibleTime",
        dataType: 'json',
        contentType: "application/json",
        data: JSON.stringify({
          updatedNum: parseFloat($("#visibleCards").val())
        }),
        success: function (data) {  
          $("#visibleCards").removeClass("visibleInputEmpty");
          options.visible = parseFloat($("#visibleCards").val())
          $(".successMessage .msg").html(data.msg);
          showSuccessMessage();
          hideVisibleForm(); 
        },
        error: function (error) {
          $(".errorMessage .msg").html(error)
          showErrorMessage();
        }
      });
    }
  });

  $("body").on("click", ".cancelVisibleCards", function () {
    hideVisibleForm()
  });


  // ADICIONAR NOVO EVENTO
  let image = false,
    files, selectedImage = false,
    editTime = false;

  $(".addNewTimeBtn").click(function () {
    editTime = false;
    $(".newTimeFormContainer, .blurContainer").removeClass("hide");
  });

  $(".cancelTimeContainer").click(function () {
    $(".newTimeFormContainer, .blurContainer").addClass("hide");
    resetForm();
  });

  $("#timeImage").change(function (time) {
    files = time.target.files;
    image = files[0];
    var reader = new FileReader();
    if (image) {
      reader.readAsDataURL(image);
    } else {
      console.log("Ocorreu um erro")
    }
    reader.onloadend = function () {
      let form_data = new FormData();
      form_data.append("image", image);
      $.ajax({
        method: "post",
        url: "/uploadFile",
        cache: false,
        dataType: 'json',
        processData: false, // Don't process the files
        contentType: false,
        data: form_data,
        success: function (data) {
          if (data.error == true) {
            image = false;
            $(".errorMessage .msg").html(data.msg);
            showErrorMessage();
          } else {
            selectedImage = true;
            $('.chooseFileContainer').css('background-image', 'url("' + reader.result + '")');
          }
        },
        error: function (error) {
          $(".errorMessage .msg").html(error)
          showErrorMessage();
        }
      });
    }
  });

  $(".inputContainer input").click(function () {
    $(this).prev().addClass("moveLabel");
  });

  $(".inputContainer input").focusout(function () {
    if ($(this).val() == "") {
      $(this).prev().removeClass("moveLabel");
    }
  });

  let  parentID;
  $(".saveTimeContainer").click(function () {
    if (checkFormInputs() && image != false) {
      $(".loadingContainer").removeClass("hide");
      let sendNewTimeData = {
        titulo: $("#timeNome").val(),
        data: $("#data").val(),
        detalhes: $("#description").val(),
      }
      if (editTime == false) {
        sendNewTimeData.id = timeList.length
        $.ajax({
          method: "post",
          url: "/newTime",
          dataType: 'json',
          contentType: "application/json",
          data: JSON.stringify(sendNewTimeData),
          success: function (data) {
            $(".newTimeFormContainer, .blurContainer").addClass("hide");
            resetForm();
            $(".successMessage .msg").html(data.msg);
            showSuccessMessage();
            timeList.push(data.information.time);
            keys.push(data.information.keys);
            bulk[data.information.keys] = data.information.time;
            addTime(data.information.time);
            $(".loadingContainer").addClass("hide");
            calculateStats();
          },
          error: function (error) {
            $(".errorMessage .msg").html(error)
            showErrorMessage();
          }
        });
      } else {
        sendNewTimeData.imagemURL = bulk[parentID].imagemURL;
        sendNewTimeData.imagePublicId = bulk[parentID].imagePublicId;
        sendNewTimeData.id = bulk[parentID].id;
        $.ajax({
          method: "post",
          url: "/editTime",
          dataType: 'json',
          contentType: "application/json",
          data: JSON.stringify({
            "id": parentID,
            "information": sendNewTimeData,
            "image": selectedImage
          }),
          success: function (data) {
            $(".newTimeFormContainer, .blurContainer").addClass("hide");
            bulk[parentID] = data.information;
            timeList[sendNewTimeData.id] = data.information;
            $("#" + parentID + " .cardTitle span").html(data.information.titulo);
            $("#" + parentID + " .cardContent span").html(data.information.detalhes);
            $("#" + parentID + " .dateContainer .timeData").html(data.information.data);
            $("#" + parentID + " .cardHeader").css("background-image", "url(" + data.information.imagemURL + ")");


            $(".loadingContainer").addClass("hide");
            $(".successMessage .msg").html(data.msg);
            showSuccessMessage();
            resetForm();
          },
          error: function (error) {
            $(".errorMessage .msg").html(error)
            showErrorMessage();
          }
        });
      }
    } else if (image == false) {
      $(".errorMessage .msg").html("Por favor selecione um imagem")
      showErrorMessage();
    } else {
      $(".errorMessage .msg").html("Por favor preencha todos os campos")
      showErrorMessage();
    }
  });


  // APAGAR MARCO
  $('body').on('click', '.deleteTime', function () {
    parentID = $(this).parents().eq(4).attr('id');
    $(".blackBackground").css({
      "opacity": "0.6",
      "visibility": "visible"
    });
    $(".deleteDialogContainer").css({
      "opacity": "1",
      "visibility": "visible"
    });
  });

  $(".cancel").click(function () {
    $(".deleteDialogContainer, .blackBackground").css({
      "opacity": "0",
      "visibility": "hidden"
    });
  });

  $(".confirm").click(function () {
    $(".deleteDialogContainer, .blackBackground").css({
      "opacity": "0",
      "visibility": "hidden"
    });
    $.ajax({
      method: "delete",
      url: "/deleteTime",
      contentType: 'application/json',
      data: JSON.stringify({
        id: parentID,
        imageID: bulk[parentID].imagePublicId
      }),
      success: function (data) {
        $("#" + parentID).addClass("hideComponent")
          .on("transitionend",function(){
            $(this).remove();
            calculateStats();
          })   
        $(".successMessage .msg").html(data);
        showSuccessMessage();   
      },
      error: function (error) {
        $(".errorMessage .msg").html(error)
        showErrorMessage();
      }
    });
  });

  // EDITAR MARCO

  $('body').on('click', '.editTime', function () {
    $(".informationContainer label").addClass("moveLabel");
    editTime = true;
    parentID = $(this).parents().eq(4).attr('id');
    let selectedTime = bulk[parentID];
    $("#timeNome").val(selectedTime.titulo);
    $("#data").val(selectedTime.data);
    $("#description").val(selectedTime.detalhes);
    $('.chooseFileContainer').css('background-image', 'url("' + selectedTime.imagemURL + '")');
    image = true;
    selectedImage = false;
    $(".newTimeFormContainer, .blurContainer").removeClass("hide");
  });


  // FUNCTIONS
  function calculateStats() {
    $(".totalCardNumber").html($(".listItemContainer").length);
    listWidth = timeList.length;
    $(".historyListContainer").css("width", listWidth * (elementWidth + 10))
  }

  function resetForm() {
    image = false;
    typeSelected = ""
    $(".informationContainer label").removeClass("moveLabel")
    $(".informationContainer input, .informationContainer textarea").val("");
    $('.chooseFileContainer').css({
      "background-color": "#2980b9",
      "background-image": "none"
    });
  }

  function hideVisibleForm(){
    $(".statContent").addClass("hideComponent").on("transitionend", function(){
      $(this).html(`
      <span class="totalVisibleCards"></span> &nbsp; Marcos visíveis
      <span class="editVisibleCards fa fa-pencil"></span>
      `).removeClass("hideComponent");
      $(".totalVisibleCards").html(options.visible);
    });

  }
  function showSuccessMessage() {
    $(".successMessage").addClass("showFormMessage").on("transitionend", function () {
      setTimeout(function () {
        $(".successMessage").removeClass("showFormMessage");
      }, 3000);
    });
  }

  function showErrorMessage() {
    $(".errorMessage").addClass("showFormMessage").on("transitionend", function () {
      setTimeout(function () {
        $(".errorMessage").removeClass("showFormMessage");
      }, 3000);
    });
  }

function checkFormInputs() {
    let check = true;
    $(".informationContainer input, .informationContainer textarea").each(function () {
      $(this).removeClass("emptyInput");
      if ($(this).val() == "") {
        $(this).addClass("emptyInput");
        check = false;
      }
    });
    return check
  }

  function addTime(item){
    $(".historyListContainer").append(`
    <div id="${keys[item.id]}" class="listItemContainer">
    <div class="historyCardContainer">
        <div class="cardContainer">
            <div class="cardTitle">
                <span>${item.titulo}</span>
            </div>
            <div class="cardHeader">
                <div class="btnContainer">
                  <span class="fa fa-pencil editTime"></span>
                  <span class="fa fa-trash deleteTime"></span>
                </div>
                <div class="dateContainer">
                    <div class="textContainer">
                        <span class="fa fa-calendar"></span> &nbsp; <span class="timeData"> ${item.data}</span>
                    </div>    
                </div>
            </div>
            <div class="cardContent">
                <span>
                ${item.detalhes}
                </span>
            </div>
        </div>
    </div>
    <div class="dotContainer">
        <div class="dot"></div>
    </div>
</div>
    `);
    $("#" + keys[item.id]).find(".cardHeader").css("background-image", "url(" + item.imagemURL + ")");
  }
});