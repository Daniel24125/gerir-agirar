$(document).ready(function () {
  let newsList, keys, bulk, numAssociados = 0,
    numNonAssociados = 0;

  $.ajax({
    method: "get",
    url: "/getNewsEmails",
    async: false,
    success: function (data) {
      if (data.news == false) {
        console.log("Nenhum Registo")
      } else {
        newsList = data.news;
        keys = data.keys
        bulk = data.bulkData;
        newsList.map((item, index) => {
          addNews(item, index);
        });
   
      }
    },
    error: function (error) {
      console.log(error);
    }
  });

  calculateStats();



  let newClicked = false;
  $(".addNewNewsletterBtn").click(function () {
    if (newClicked == false) {
      $(".newsletterItemsContainer").append(`
    <div id="newsItemContainerForm" class="newsItemContainer ">
      <div class="iconContainer newIcon newIconAssociate">
         <span class="category">A</span>
      </div>
      <div class="iconContainer newIcon newIconNonAssociate">
         <span class="category">NA</span>
      </div>
      <input type="email" name="email" id="email" placeholder="email"/>
      <div class="btnContainer">
        <div class="btn saveNewContainer">
           <span class="fa fa-floppy-o"></span>
        </div>
        <div class="btn cancelNewContainer">
          <span class="fa fa-times"></span>
        </div>
      </div>
    </div>
    `);
      newClicked = true
    }
  });

  let categoryClicked = false

  $("body").on("click", ".newIconAssociate", function () {
    $(".newIconAssociate, .newIconNonAssociate").removeClass("associate nonAssociate");
    $(this).addClass("associate selectedCategory");
    categoryClicked = true
  });

  $("body").on("click", ".newIconNonAssociate", function () {
    $(".newIconAssociate, .newIconNonAssociate").removeClass("associate nonAssociate");
    $(this).addClass("nonAssociate selectedCategory");
    categoryClicked = true
  });

  $("body").on("click", ".cancelNewContainer", function () {
    $(this).parents().eq(1).remove();
    newClicked = false;
  });

  $("body").on("click", ".saveNewContainer", function () {
    if (checkFormInputs() && ($(".newIcon").hasClass("nonAssociate") || $(".newIcon").hasClass("associate"))) {
      let newCategory = 0;
      if ($(".selectedCategory .category").html() == "NA") {
        newCategory = 1
      }
      $.ajax({
        method: "post",
        url: "/newNewsletterEmail",
        dataType: 'json',
        contentType: "application/json",
        data: JSON.stringify({
          "email": $("#email").val(),
          "category": newCategory
        }),
        success: function (data) {
          $("#newsItemContainerForm").remove();
          keys.push(data.newNewsletterEmail.id);
          addNews(data.newNewsletterEmail, keys.length-1);
          $(".successMessage .msg").html(data.msg);
          showSuccessMessage()
          newClicked = false;
          calculateStats();
        },
        error: function (error) {
          $(".errorMessage .msg").html(error)
          showErrorMessage();
        }
      });
    } else if (checkFormInputs() == false) {
      $(".errorMessage .msg").html("Por favor preencha o campo do email!");
      showErrorMessage();
    } else {
      $(".errorMessage .msg").html("Por favor selecione se o endereço de email pertence a um associado ou não associado!");
      showErrorMessage();
    }
  });

var parentID;
// DELETE EMAIL
$('body').on('click', '.deleteNews', function () {
  parentID = $(this).parents().eq(1).attr('id');
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
    url: "/deleteNewsletterEmail",
    contentType: 'application/json',
    data: JSON.stringify({
      id: parentID
    }),
    success: function (data) {
      $("#" + parentID).addClass("hideComponent")
        .on("transitionend",function(){
          if($(this).children(".iconContainer").hasClass("associate")){
            numAssociados--
          }else{
            numNonAssociados--
          }
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

  // FUNCTIONS

  function calculateStats(){
    $(".associateNumber").html(numAssociados);
    $(".nonAssociateNumber").html(numNonAssociados);
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
    $("input").each(function () {
      $(this).removeClass("emptyInput");
      if ($(this).val() == "") {
        $(this).addClass("emptyInput");
        check = false;
      }
    });
    return check
  }

  function addNews(item, index) {
    let category, initials;
    if (item.category == 0) {
      category = "associate";
      initials = "A";
      numAssociados++
    } else {
      category = "nonAssociate";
      initials = "NA"
      numNonAssociados++
    }
    $(".newsletterItemsContainer").append(`
    <div id="${keys[index]}" class="newsItemContainer">
          <div class="iconContainer ${category}">
             <span class="category">${initials}</span>
          </div>
          <span class="email">${item.email}</span>
          <div class="deleteContainer">
            <span class="deleteNews fa fa-trash"></span>
          </div>
        </div>
    `);
  }
});