$(document).ready(function () {
  let eventsList, keys, bulk,
    optionContainerVisibility = false,
    numMain = 0;
  $.ajax({
    method: "get",
    url: "/getEvents",
    async: false,
    success: function (data) {
      eventsList = data.events;
      keys = data.keys
      bulk = data.bulkData;
    },
    error: function (error) {
      console.error(error);
    }
  });

  eventsList.map(function (item, index) {
    addNewEvent(item, index);
  });

  calculateStats();

  $(".loadingContainer").addClass("hide");
  
  $("body").on("click", ".mainCardIconContainer", function () {
    let selectedId = $(this).parents().eq(1).attr("id");
    $("#" + selectedId + " .mainCardIconContainer").toggleClass("eyeSelected");
    calculateStats();
    $.ajax({
      method: "post",
      url: "/updateMainEvent",
      dataType: 'json',
      contentType: "application/json",
      data: JSON.stringify({
        id: selectedId,
        mainStatus: $("#" + selectedId + " .mainCardIconContainer").hasClass("eyeSelected")
      }),
      success: function (data) {
        $(".successMessage .msg").html(data.msg);
        showSuccessMessage();
      },
      error: function (error) {
        $(".errorMessage .msg").html(error)
        showErrorMessage();
      }
    });
  });


  $(".blurContainer").click(function () {
    $(".blurContainer,  .newEventFormContainer").addClass("hide");
    resetForm();
  });

  // ADICIONAR NOVO EVENTO
  let image = false,
    files, selectedImage = false,
    editEvent = false;

  $(".addNewEventBtn").click(function () {
    editEvent = false;
    $(".newEventFormContainer, .blurContainer").removeClass("hide");
  });

  $(".cancelEventContainer").click(function () {
    $(".newEventFormContainer, .blurContainer").addClass("hide");
    resetForm();
  });
  $("#eventImage").change(function (event) {
    files = event.target.files;
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

  $(".type").click(function () {
    let typeData = $(this).children().data("type").toLowerCase();
    $(".type").removeClass("typeSelected");
    $(".type .typeText").removeClass("atividade workshop evento sessão");
    $(this).toggleClass("typeSelected").children().toggleClass(typeData);
  });

  $(".mainEventContainer").click(function () {
    $(this).children().toggleClass("selectedMain");
  });

  let typeSelected = "",
    parentID, numSelectedTypes;
  $(".saveEventContainer").click(function () {
    numSelectedTypes = $(".typeSelected").length;
    if (checkFormInputs() && image != false && numSelectedTypes > 0) {
      $(".loadingContainer").removeClass("hide");
      let sendNewEventData = {
        titulo: $("#eventNome").val(),
        tipo: $(".typeSelected").children().data("type"),
        localizacao: $("#localizacao").val(),
        data: $("#data").val(),
        horario: $("#hora").val(),
        detalhes: $("#description").val(),
        price: $("#price").val(),
      }
      if ($(".mainEventContainer").children().hasClass("selectedMain")) {
        sendNewEventData.asMain = true
      } else {
        sendNewEventData.asMain = false
      }
      if (editEvent == false) {
        $.ajax({
          method: "post",
          url: "/newEvent",
          dataType: 'json',
          contentType: "application/json",
          data: JSON.stringify(sendNewEventData),
          success: function (data) {
            $(".newEventFormContainer, .blurContainer").addClass("hide");
            resetForm();
            $(".successMessage .msg").html(data.msg);
            showSuccessMessage();
            eventsList.push(data.information.events);
            keys.push(data.information.keys);
            bulk[data.information.keys] = data.information.events;
            addNewEvent(data.information.events, keys.length - 1);
            $(".loadingContainer").addClass("hide");
            calculateStats();
          },
          error: function (error) {
            $(".errorMessage .msg").html(error)
            showErrorMessage();
          }
        });
      } else {
        sendNewEventData.imagemURL = bulk[parentID].imagemURL;
        sendNewEventData.imagePublicId = bulk[parentID].imagePublicId;
        $.ajax({
          method: "post",
          url: "/editEvent",
          dataType: 'json',
          contentType: "application/json",
          data: JSON.stringify({
            "id": parentID,
            "information": sendNewEventData,
            "image": selectedImage
          }),
          success: function (data) {
            $(".newEventFormContainer, .blurContainer").addClass("hide");
            bulk[parentID] = data.information;
            eventsList[sendNewEventData.id] = data.information;
            $("#" + parentID + " .cardHeader h3").html(data.information.titulo);
            $("#" + parentID + " .eventPrice").html(data.information.price + "€");
            $("#" + parentID + " .eventType").removeClass("evento sessão workshop atividade").addClass(data.information.tipo.toLowerCase()).children().html(data.information.tipo[0]);
            $("#" + parentID + " .eventText").html(data.information.tipo);
            $("#" + parentID + " .detalhes").html(data.information.detalhes);
            $("#" + parentID + " .cardHeader").css("background-image", "linear-gradient(rgba(0, 0, 0, 0.7),rgba(0, 0, 0, 0.7)),url(" + data.information.imagemURL + ")");
            $("#" + parentID + " .textContainer span").html(data.information.name);


            $(".loadingContainer").addClass("hide");
            $(".successMessage .msg").html(data.msg);
            showSuccessMessage();
            resetForm();
            calculateStats();
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
    } else if (numSelectedTypes == 0) {
      $(".errorMessage .msg").html("Por favor selecione um tipo de evento")
      showErrorMessage();
    } else {
      $(".errorMessage .msg").html("Por favor preencha todos os campos")
      showErrorMessage();
    }
  });



  // APAGAR EVENTO

  $('body').on('click', '.delete', function () {
    parentID = $(this).parents().eq(2).attr('id');
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
      url: "/deleteEvent",
      contentType: 'application/json',
      data: JSON.stringify({
        id: parentID,
        imageID: bulk[parentID].imagePublicId
      }),
      success: function (data) {
        $("#" + parentID).remove();
        $(".successMessage .msg").html(data);
        showSuccessMessage();
        calculateStats();
      },
      error: function (error) {
        $(".errorMessage .msg").html(error)
        showErrorMessage();
      }
    });
  });


  // EDITAR EVENTO

  $('body').on('click', '.edit', function () {
    $(".informationContainer label").addClass("moveLabel");
    editEvent = true;
    parentID = $(this).parents().eq(2).attr('id');
    let selectedEvent = bulk[parentID];
    let selectedEventType = selectedEvent.tipo;
    if(selectedEvent.asMain){
      $(".mainEventContainer span").addClass("selectedMain");
    }else{
      $(".mainEventContainer span").removeClass("selectedMain");
    }
    $("#eventNome").val(selectedEvent.titulo);
    $("#localizacao").val(selectedEvent.localizacao);
    $("#price").val(selectedEvent.price);
    $("#data").val(selectedEvent.data);
    $("#hora").val(selectedEvent.horario);
    $("#description").val(selectedEvent.detalhes);
    $(".typeText[data-type='" + selectedEvent.tipo).addClass(selectedEventType.toLowerCase()).parent().addClass("typeSelected")
    $('.chooseFileContainer').css('background-image', 'url("' + selectedEvent.imagemURL + '")');
    image = true;
    selectedImage = false;
    $(".newEventFormContainer, .blurContainer").removeClass("hide");
  });


  // FUNCTIONS

  function calculateStats() {
    $(".numberAtividade").html($(".cardContent .atividade").length);
    $(".numberSessao").html($(".cardContent .sessão").length);
    $(".numberWorkshop").html($(".cardContent .workshop").length);
    $(".numberEvento").html($(".cardContent .evento").length);
    $(".numMainEvents").html($(".eyeSelected").length);
  }

  function addNewEvent(item, index) {
    let mainClass = "";
    if (item.asMain) {
      mainClass = "eyeSelected"
    }
    $(".eventsContainer").append(`
  <div id="${keys[index]}" class="card">
  <div class="cardHeader">
    <div class="cardTitle">
      <h3 class="mpzero">${item.titulo}</h3>
      <p>
        <h5 class="mpzero">
          <span class="fa fa-map-marker"></span> &nbsp; <span class="localizacao">${item.localizacao}</span> &nbsp;
          <p><span class="fa fa-calendar"></span> &nbsp; <span class="data">${item.data}</span> &nbsp;
          <span class="fa fa-clock-o"> </span>&nbsp; <span class="horario">${item.horario}</span>
          </h5>
          <div class="eventPrice">${item.price}€</div>
          </p>
      </p>
      
    </div>
  </div>
  <div class="cardContent">
  <div class="eventTypeContainer">
   <div class="eventType  ${item.tipo.toLowerCase()}"><span> ${item.tipo[0]}</span></div>
   <div class="eventText">
     ${item.tipo}
   </div>
 </div>
   <div class="mainCardIconContainer ${mainClass}">
     <span class="fa fa-heart"></span>
   </div>
   <span class="detalhes">${item.detalhes}</span>
  </div>
  <div class="cardFooter">
    <div class="btnContainer">
      <span class="edit">EDITAR</span>
      <span class="delete">APAGAR</span>
    </div>
  </div>
 </div>
  `);
    $("#" + keys[index] + " .cardHeader").css("background-image", "linear-gradient(rgba(0, 0, 0, 0.7),rgba(0, 0, 0, 0.7)),url(" + item.imagemURL + ")")
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
    $(".type").removeClass("typeSelected").children().removeClass("atividade sessão workshop evento");
    $(".informationContainer .mainEventContainer span").removeClass("selectedMain");
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


});