$(document).ready(function () {
  let eventsList;
  let originalData, usersKeys, usersList;
  let editUsers = false;
  let parentID
  let optionContainerVisibility = false;


  $.ajax({
    method: "get",
    url: "/getUsers",
    success: function (data) {
      if (data == false) {
        $(".usersListContainer").html(`
              <span class="noUsers"><span class="fa fa-times"></span> Nenhum associado foi registado até ao momento</span>
            `)
      } else {
        originalData = data.bulkData;
        usersList = data.users;
        usersKeys = data.keys;
        usersList.map(function(item, index){
          getUsers(originalData, item, index);
        })
        
      }
    },
    error: function (error) {
      console.log(error);
    }
  });

  $(".searchBtn").click(function () {
    $(".loadingContainer").removeClass("hide");
    if ($(".searchBtn span").hasClass("closeSearch")==false){
      $.ajax({
        method: "post",
        url: "/searchUser",
        contentType: 'application/json',
        data: JSON.stringify({
          search: $("#searchUser").val(),
          field: $("#searchParameter").val()
        }),
        success: function (data) {
          $(".loadingContainer").addClass("hide")
          if (data == false) {
            $(".noSearchResults").addClass("showFormMessage").on("transitionend", function () {
              setTimeout(function () {
                $(".noSearchResults").removeClass("showFormMessage");
              }, 3000);
            });
          } else {
            $(".searchBtn span").toggleClass("fa-search fa-times closeSearch").parent().css({
              "background": "#e74c3c"
            });
            $("#userContainer").html("");
            data.users.map(function(item, index){
              getUsers(data.bulkData, item, index);
            })
          }
        },
        error: function (error) {
          console.log(error);
        }
      });
    }else{     
      $("#userContainer").html("");
      usersList.map(function(item, index){
        getUsers(originalData, item, index);
      })
      $(".searchBtn span").toggleClass("fa-search fa-times closeSearch").parent().css({
        "background": "#f39c12"
      });
      $("#searchUser").val("");
      $(".loadingContainer").addClass("hide")
    }
    
  });

  $('body').on('click', '.optionsBtnContainer span:last-child', function () {
    optionContainerVisibility = true
    $(this).parent().parent().children().last().css({
      "opacity": "1",
      "visibility": "visible"
    })
  });

  $('body').on('click', '.delete', function () {
    parentID = $(this).parents().eq(3).attr('id');
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
      url: "/deleteUser",
      contentType: 'application/json',
      data: JSON.stringify({
        id: parentID
      }),
      success: function (data) {
        $("#" + parentID).remove();

      },
      error: function (error) {
        console.log(error);
      }
    });
  });

  $('body').on('click', '.edit', function () {
    editUsers = true
    parentID = $(this).parents().eq(3).attr('id');
    currentUser = originalData[parentID];
    $(".fieldContainer .nome").val(currentUser.nome);
    $(".fieldContainer .email").val(currentUser.email);
    $(".fieldContainer .telefone").val(currentUser.telefone);
    $(".fieldContainer .morada").val(currentUser.morada);
    $(".fieldContainer .codPostal").val(currentUser.codPostal);
    $(".fieldContainer .localidade").val(currentUser.localidade);
    $(".fieldContainer .dataNascimento").val(currentUser.dataNascimento);
    $(".fieldContainer .nif").val(currentUser.nif);
    $(".fieldContainer .contribuicao").val(currentUser.contribuicao);
    $(".fieldContainer .nib").val(currentUser.nib);
    $(".fieldContainer .freqPagamento option").filter(function () {
      return ($(this).text() == currentUser.freqPagamento); 
    }).prop('selected', true);
    $(".fieldContainer .modoPagamento option").filter(function () {
      return ($(this).text() == currentUser.modoPagamento); 
    }).prop('selected', true);
    $(".fieldContainer input").prev().addClass("moveLabel");
    $(".blurBackground").css({
      "opacity": "0.9",
      "visibility": "visible"
    });
    $(".userFormContainer, .closeUserForm").css({
      "opacity": "1",
      "visibility": "visible"
    });
  });

  $('body').on('click', '.userInfo', function () {
    parentID = $(this).parents().eq(2).attr('id');
    currentUser = originalData[parentID];
    $(".cardContentContainer .name").html(currentUser.name);
    $(".cardContentContainer .email").html(currentUser.email);
    $(".cardContentContainer .phone").html(currentUser.telefone);
    $(".cardContentContainer .morada").html(currentUser.morada);
    $(".cardContentContainer .codPostal").html(currentUser.codPostal);
    $(".cardContentContainer .localidade").html(currentUser.localidade);
    $(".cardContentContainer .dataNascimento").html(currentUser.dataNascimento);
    $(".cardContentContainer .nif").html(currentUser.nif);
    $(".cardContentContainer .contribuicao").html(currentUser.contribuicao);
    $(".cardContentContainer .nib").html(currentUser.nib);
    $(".cardContentContainer .freqPagamento").html(currentUser.freqPagamento);
    $(".cardContentContainer .modoPagamento").html(currentUser.modoPagamento);

    $(".blurBackground").css({
      "opacity": "0.9",
      "visibility": "visible"
    });
    $(".cardContainer").css({
      "opacity": "1",
      "visibility": "visible"
    });
  });

  $(".closeCard").click(function () {
    $(".blurBackground, .cardContainer").css({
      "opacity": "0",
      "visibility": "hidden"
    });
  });

  $(".usersContainer").click(function () {
    if (optionContainerVisibility == true) {
      hideOptions();
    }
  });

  $(".addUserContainer").click(function () {
    editUsers = false;
    $(".fieldContainer input").val("").prev().removeClass("moveLabel");
    $(".blurBackground").css({
      "opacity": "0.9",
      "visibility": "visible"
    });
    $(".userFormContainer, .closeUserForm").css({
      "opacity": "1",
      "visibility": "visible"
    });
  });

  $(".closeUserForm").click(function () {
    closeDialog();
  });

  $(".saveNewUser").click(function () {

    if (checkFormInputs() && checkCounts()) {
      let sendData = {
        "nome": $(".fieldContainer .nome").val(),
        "email": $(".fieldContainer .email").val(),
        "telefone": $(".fieldContainer .telefone").val(),
        "dataNascimento": $(".fieldContainer .dataNascimento").val(),
        "morada": $(".fieldContainer .morada").val(),
        "codPostal": $(".fieldContainer .codPostal").val(),
        "localidade": $(".fieldContainer .localidade").val(),
        "nif": $(".fieldContainer .nif").val(),
        "contribuicao": $(".fieldContainer .contribuicao").val(),
        "freqPagamento": $(".fieldContainer .freqPagamento option:selected").text(),
        "modoPagamento": $(".fieldContainer .modoPagamento option:selected").text(),
        "nib": $(".fieldContainer .nib").val()
      }
      if (editUsers == false) {
        $.ajax({
          method: "post",
          url: "/registerUser",
          contentType: 'application/json',
          data: JSON.stringify(sendData),
          success: function (data) {
            closeDialog();
            location.reload();
          },
          error: function (error) {
            console.log(error);
          }
        });
      } else {
        $.ajax({
          method: "post",
          url: "/editUser",
          contentType: 'application/json',
          data: JSON.stringify({
            id: parentID,
            save: sendData
          }),
          success: function (data) {
            closeDialog();
            location.reload();
          },
          error: function (error) {
            console.log(error);
          }
        });
      }
    } else if (checkCounts() == false) {
      showMessageCounts();
    } else {
      showMessage();
    }
  });

  $(".fieldContainer input").click(function () {
    $(this).prev().addClass("moveLabel");
  });

  $(".fieldContainer input").focusout(function () {
    if ($(this).val() == "") {
      $(this).prev().removeClass("moveLabel");
    }
  })


  function closeDialog() {
    $(".blurBackground, .userFormContainer, .closeUserForm").css({
      "opacity": "0",
      "visibility": "hidden"
    });
  }

  function showMessage() {
    $(".formMessage").addClass("showFormMessage").on("transitionend", function () {
      setTimeout(function () {
        $(".formMessage").removeClass("showFormMessage");
      }, 3000);
    });
  }

  function showMessageCounts() {
    $(".formMessageCounts").addClass("showFormMessage").on("transitionend", function () {
      setTimeout(function () {
        $(".formMessageCounts").removeClass("showFormMessage");
      }, 3000);
    });
  }

  function checkFormInputs() {
    let check = true;
    $(".fieldContainer input").each(function () {
      $(this).removeClass("emptyInput");
      if ($(this).val() == "") {
        $(this).addClass("emptyInput");
        check = false;
      }

    });

    $(".fieldContainer select").each(function () {
      $(this).removeClass("emptyInput");
      if (this.selectedIndex == 0) {
        $(this).addClass("emptyInput");
        check = false;
      }
    });
    return check
  }

  function checkCounts() {
    // $(".freqPagamento").removeClass("emptyInput");
    // $(".contribuicao").removeClass("emptyInput");
    let check = true;
    let index = $(".freqPagamento").selectedIndex;
    let value = $(".freqPagamento").val();
    let currectValue = 2 * value;
    if ($(".contribuicao").val() < currectValue) {
      check = false;
      $(".freqPagamento").addClass("emptyInput");
      $(".contribuicao").addClass("emptyInput");
    }
    return check;
  }

  function hideOptions() {
    $(".optionListContainer").css({
      "opacity": "0",
      "visibility": "hidden"
    })
    optionContainerVisibility = false
  }

  function getUsers(bulk, item, i) {
      $("#userContainer").append(`
      <tr id=${Object.keys(bulk)[i]} >
      <th class="photoContainer"><div class="photo"><span class="fa fa-user"></span></div></th> 
      <th class="name"> <span class="textContainer">${item.nome} </span> </th>
      <th class="email"> <span class="textContainer">${item.email}</span> </th>
      <th class="phone"> <div class="textContainer"><span>${item.telefone}</span> </div></th>
      <th class="nif"> <span class="textContainer">${item.nif} </span> </th>
      <th class="options">
        <div class="optionsBtnContainer">
          <span class="userInfo fa fa-info-circle"></span> <span class="fa fa-ellipsis-v"></span>
        </div>
        <div class="optionListContainer">
          <ul class="mpzero">
            <li class="edit">
              EDITAR
            </li>
            <li class="delete">
              ELIMINAR
            </li>
          </ul>
        </div>
      </th>
    </tr>
      `);

  }
})