$(document).ready(function () {
  let ateliersList, keys, bulk,
    optionContainerVisibility = false;
  $.ajax({
    method: "get",
    url: "/getAteliers",
    async: false,
    success: function (data) {
      ateliersList = data.ateliers;
      keys = data.keys
      bulk = data.bulkData;
    },
    error: function (error) {
      console.error(error);
    }
  });

  $("#ateliers").click(function () {
    if (optionContainerVisibility == true) {
      hideOptions();
    }
  });

  $(".loadingContainer").addClass("hide")

  ateliersList.map(function (val, index) {
    $(".ateliersContainer").append(`
    <div class="cardContainer">
    <div id="` + keys[index] + `" class="card at` + val.id + `">
      <div class="titleContainer">
        <div class="hoverCard"></div>
        <div class="optionsContainer ">
        <span class="fa fa-ellipsis-v"></span>
        <div class="optionListContainer hide">
        <ul class="mpzero">
          <li class="edit">
            EDITAR
          </li>
          <li class="delete">
            ELIMINAR
          </li>
        </ul>
      </div>
        </div>
        <div class="textContainer">
          <span>` + val.name + `</span>
        </div>
      </div>
    </div>
  </div>
    `);
    $(".at" + val.id).css({
      "background": "url('" + val.imagemURL + "')",
      "background-size": "cover",
      "background-position": "center"
    });
  });

  $("body").on("click", ".card", function () {
    $(".blurContainer, .atelierDialogContainer").removeClass("hide");
    let id = $(this).attr("id");
    currentItem = bulk[id]
    $(".dialogHeaderContainer .photo").css({
      "background": "url('" + currentItem.imagemURL + "')",
      "background-size": "cover",
      "background-position": "center"
    });
    $(".dialogHeaderContainer .titleContainer span").html(currentItem.name);
    $(".dialogHeaderContainer .informationContainer .dias").html(currentItem.dias);
    $(".dialogHeaderContainer .informationContainer .horas").html(currentItem.horas);
    $(".dialogContentContainer p span").html(currentItem.desc);
  });


  $("body").on("click", ".optionsContainer", function (e) {
    $(this).find(".optionListContainer").removeClass("hide");
    optionContainerVisibility = true
    e.stopPropagation();
  });


  $(".blurContainer").click(function () {
    $(".blurContainer, .atelierDialogContainer, .newAtelierFormContainer").addClass("hide")
  });

  // ADICIONAR NOVO ATELIER
  let image = false,
    files, selectedImage = false;

  $(".newCard").click(function () {
    editAtelier = false;
    $(".newAtelierFormContainer, .blurContainer").removeClass("hide");
  });

  $(".cancelAtelierContainer").click(function () {
    $(".newAtelierFormContainer, .blurContainer").addClass("hide");
    resetForm();
  });
  $("#atelierImage").change(function (event) {
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

  $(".titleContainer input, .inputContainer input").click(function () {
    $(this).prev().addClass("moveLabel");
  });
  $(".titleContainer input, .inputContainer input").focusout(function () {
    if ($(this).val() == "") {
      $(this).prev().removeClass("moveLabel");
    }
  });

  $(".dayText").click(function () {
    $(this).parent().toggleClass("daySelected")
  });

  let numSelectedDays, daysSelected = "",
    editAtelier = false,
    parentID;
  $(".saveAtelierContainer").click(function () {
    numSelectedDays = $(".daySelected").length;
    if (checkFormInputs() && image != false && numSelectedDays > 0) {
      $(".loadingContainer").removeClass("hide");
      $(".daySelected").each(function (index) {
        if (index > 0) {
          daysSelected += " & "
        }
        daysSelected += $(this).children(".dayText").data("dia");
      });
      let sendNewAtelierData = {
        name: $("#atelierNome").val(),
        dias: daysSelected,
        horas: $("#horaInicio").val() + " - " + $("#horaFim").val(),
        desc: $("#description").val(),
        id: ateliersList.length
      }
      if (editAtelier == false) {
        $.ajax({
          method: "post",
          url: "/newAtelier",
          dataType: 'json',
          contentType: "application/json",
          data: JSON.stringify(sendNewAtelierData),
          success: function (data) {
            $(".newAtelierFormContainer, .blurContainer").addClass("hide");
            resetForm();
            $(".successMessage .msg").html(data.msg);
            showSuccessMessage();
            ateliersList.push(data.information.ateliers);
            keys.push(data.information.keys);
            bulk[data.information.keys] = data.information.ateliers;
            addNewAteleir(data.information);
            $(".loadingContainer").addClass("hide");
          },
          error: function (error) {
            $(".errorMessage .msg").html(error)
            showErrorMessage();
          }
        });
      } else {
        sendNewAtelierData.id = bulk[parentID].id;
        sendNewAtelierData.imagemURL = bulk[parentID].imagemURL;
        sendNewAtelierData.imagePublicId = bulk[parentID].imagePublicId;
        $.ajax({
          method: "post",
          url: "/editAtelier",
          dataType: 'json',
          contentType: "application/json",
          data: JSON.stringify({
            "id":parentID,
            "information": sendNewAtelierData,
            "image": selectedImage
          }),
          success: function (data) {
            $(".newAtelierFormContainer, .blurContainer").addClass("hide");
            bulk[parentID] = data.information;
            ateliersList[sendNewAtelierData.id] = data.information;
            $("#"+parentID+" .textContainer span").html(data.information.name);
            $("#"+parentID).css("background-image","url("+data.information.imagemURL+")");
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
    } else if (numSelectedDays == 0) {
      $(".errorMessage .msg").html("Por favor selecione os dias da semana")
      showErrorMessage();
    } else {
      $(".errorMessage .msg").html("Por favor preencha todos os campos")
      showErrorMessage();
    }
  });



  // APAGAR ATELIER

  $('body').on('click', '.delete', function () {
    parentID = $(this).parents().eq(4).attr('id');
    hideOptions();
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
      url: "/deleteAtelier",
      contentType: 'application/json',
      data: JSON.stringify({
        id: parentID,
        imageID: bulk[parentID].imagePublicId
      }),
      success: function (data) {
        $("#" + parentID).parent().remove();

      },
      error: function (error) {
        console.log(error);
      }
    });
  });

  // EDITAR ATELIER

  $('body').on('click', '.edit', function () {
    $(".informationContainer label").addClass("moveLabel");
    editAtelier = true;
    parentID = $(this).parents().eq(4).attr('id');
    let selectedAtelier = bulk[parentID];
    hideOptions();
    $("#atelierNome").val(selectedAtelier.name);
    $("#horaInicio").val(selectedAtelier.horas.slice(0, 5));
    $("#horaFim").val(selectedAtelier.horas.slice(selectedAtelier.horas.length - 5, selectedAtelier.horas.length));
    $("#description").val(selectedAtelier.desc);
    $(".dayText[data-dia='" + selectedAtelier.dias.slice(selectedAtelier.dias.length - 3, selectedAtelier.dias.length) + "'").parent().addClass("daySelected")
    if (selectedAtelier.dias.indexOf("&") != -1) {
      for (var i = 0; i < selectedAtelier.dias.length; i++) {
        if (selectedAtelier.dias[i] == "&") {
          console.log(selectedAtelier.dias.slice(i - 4, i - 1))
          $(".dayText[data-dia='" + selectedAtelier.dias.slice(i - 4, i - 1) + "'").parent().addClass("daySelected")
        }
      }
    }
    $('.chooseFileContainer').css('background-image', 'url("' + selectedAtelier.imagemURL + '")');
    image = true;
    selectedImage = false; 
    $(".newAtelierFormContainer, .blurContainer").removeClass("hide");
  });


  // FUNCTIONS

  function hideOptions() {
    $(".optionListContainer").addClass("hide");
    optionContainerVisibility = false
  }

  function addNewAteleir(newAt) {
    $(".ateliersContainer").append(`
  <div class="cardContainer">
  <div id="` + newAt.keys + `" class="card at` + newAt.ateliers.id + `">
    <div class="titleContainer">
      <div class="hoverCard"></div>
      <div class="optionsContainer ">
      <span class="fa fa-ellipsis-v"></span>
      <div class="optionListContainer hide">
      <ul class="mpzero">
        <li class="edit">
          EDITAR
        </li>
        <li class="delete">
          ELIMINAR
        </li>
      </ul>
    </div>
      </div>
      <div class="textContainer">
        <span>` + newAt.ateliers.name + `</span>
      </div>
    </div>
  </div>
</div>
  `);
    $(".at" + newAt.ateliers.id).css({
      "background": "url('" + newAt.ateliers.imagemURL + "')",
      "background-size": "cover",
      "background-position": "center"
    });
  }

  function resetForm() {
    image = false;
    daysSelected = ""
    $(".informationContainer label").removeClass("moveLabel")
    $(".informationContainer input, .informationContainer textarea").val("");
    $('.chooseFileContainer').css({
      "background-color": "#2980b9",
      "background-image": "none"
    });
    $(".day").removeClass("daySelected");
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