var express = require('express');
var bodyParser = require("body-parser");
var path = require("path");
var fs = require("fs");
var app = express();
var port = process.env.PORT || 9000;


const nodemailer = require('nodemailer');
let emailConfig = require("./config/email.json");
let transporter = nodemailer.createTransport(emailConfig);

// Add headers
app.use(function (req, res, next) {

  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', 'http://agirar.pt');
  // res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8000');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
});
var config = require("./config/config.json");
var firebase = require('firebase');
firebase.initializeApp(config);

var auth = require("./middlewares/auth");

// Body Parser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(auth.router);

app.get('*', function (req, res, next) {

  if (req.path.includes('log') || req.path.includes('getEvents') || req.path.includes('getAteliers') || req.path.includes('getTimeline') || req.path.includes('getStats')) {
    next();
  } else {
    auth.isAuthenticated(req, res, next);
  }
});

// GET STATIC FOLDER
app.use(express.static(path.join(__dirname, "public")));

var usersList;
var usersRef = firebase.database().ref("associados");
var usersKey;
var originalData;
var newsRef = firebase.database().ref("newsletter");

usersRef.on("value", function (data) {
  usersList = [];
  usersKey = [];
  originalData = [];
  if (data.val() == null) {
    usersList = false
  } else {
    originalData = data.val();
    usersKey = Object.keys(data.val())
    var receivedData = data.val();
    usersKey.map(function (item) {
      var currentUser = receivedData[item];
      usersList.push(currentUser);
    });
  }
}, function (err) {
  console.log(err);
});



app.get("/getUsers", function (req, res) {
  res.send({
    "bulkData": originalData,
    "users": usersList,
    "keys": usersKey
  });
});


app.post("/registerUser", function (req, res) {
  usersRef.push(req.body)
  newsRef.push({
    "email": req.body.email,
    "category": 0
  });
  res.send("O registo foi efetuado com sucesso");
});

app.delete('/deleteUser', function (req, res) {
  var id = req.body.id;
  usersRef.child(id).remove();
  res.send("O seu registo foi eliminado com sucesso");
});

app.post('/editUser', function (req, res) {
  var id = req.body.id;
  usersRef.child(id).set(req.body.save);
  res.send("O seu registo foi editado com sucesso");
});

app.post("/searchUser", function (req, res) {
  usersRef.orderByChild(req.body.field).startAt(req.body.search).endAt(req.body.search + "\uf8ff").once("value", (snap) => {
    var queryData = snap.val();
    if (queryData != null) {
      var searchKeys = Object.keys(queryData);
      var sendData = [];
      searchKeys.map(function (key) {
        sendData.push(snap.val()[key]);
      });
      res.send({
        "bulkData": queryData,
        "users": sendData,
        "keys": searchKeys
      });
    } else {
      res.send(false);
    }
  });
});

// ROUTES GESTAO ATELIERS
var atRef = firebase.database().ref("ateliers");
var ateliersList, ateliersKey, atOriginalData;

atRef.on("value", function (data) {
  ateliersList = [];
  ateliersKey = [];
  atOriginalData = [];
  if (data.val() == null) {
    ateliersList = false
  } else {
    atOriginalData = data.val();
    ateliersKey = Object.keys(data.val())
    var atReceivedData = data.val();
    ateliersKey.map(function (item) {
      var currentAtelier = atReceivedData[item];
      ateliersList.push(currentAtelier);
    });
  }
}, function (err) {
  console.log(err);
});

app.get("/getAteliers", function (req, res) {
  res.send({
    "bulkData": atOriginalData,
    "ateliers": ateliersList,
    "keys": ateliersKey
  });
});


var multer = require('multer');
// Set storage engine
let tempFileName;
const storage = multer.diskStorage({
  destination: "./uploads",
  filename: function (req, file, cb) {
    tempFileName = file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    cb(null, tempFileName);
  }
});

const upload = multer({
  storage: storage,
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  }
}).single("image");

function checkFileType(file, cb) {
  let filetypes = /jpeg|jpg|png|gif/;
  let extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  let mimetype = filetypes.test(file.mimetype);
  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb("Coloque apenas imagens (jpg, jpeg, gif ou png)");
  }
}

app.post("/uploadFile", function (req, res, next) {
  upload(req, res, (err) => {
    if (err) {
      res.send({
        error: true,
        msg: err
      });
    } else {
      res.send({
        error: false,
        msg: "Imagem adicionada com sucesso"
      })
    }
  });
});
var cloudinary = require('cloudinary');
var cloudinaryConfig = JSON.parse(fs.readFileSync("./config/cloudinary.json", "utf-8"))
cloudinary.config(cloudinaryConfig);

app.post("/newAtelier", function (req, res) {
  let newAtelierData = req.body
  cloudinary.uploader.upload("./uploads/" + tempFileName, function (result) {
    fs.unlink("./uploads/" + tempFileName, function (err) {
      if (err) {
        console.log(err);
      } else {
        console.log("Imagem removida com sucesso");
      }
    });
    newAtelierData.imagemURL = result.url;
    newAtelierData.imagePublicId = result.public_id
    let newAtKey = atRef.push(newAtelierData).key;
    res.send({
      msg: "Novo atelier adicionado com sucesso :)",
      information: {
        "bulkData": {
          newAtKey: newAtelierData
        },
        "ateliers": newAtelierData,
        "keys": newAtKey
      }
    });
  });
});

app.delete('/deleteAtelier', function (req, res) {
  var id = req.body.id;
  var publicID = req.body.imageID;
  cloudinary.v2.uploader.destroy(publicID, function (error, result) {
    if (error) {
      res.send("Ocorreu o seguinte erro: " + error);
    } else {
      atRef.child(id).remove();
      res.send("O seu registo foi eliminado com sucesso");
    }
  });
});

app.post("/editAtelier", function (req, res) {
  var atId = req.body.id;
  var editAtelierInfo = req.body.information;
  if (req.body.image == false) {
    atRef.child(atId).set(editAtelierInfo)
    res.send({
      msg: "O atelier foi editado com sucesso :)",
      information: editAtelierInfo
    });
  } else {
    cloudinary.v2.uploader.destroy(editAtelierInfo.imagePublicId, function (error, result) {
      if (error) {
        res.send("Ocorreu o seguinte erro: " + error);
      }
    });
    cloudinary.uploader.upload("./uploads/" + tempFileName, function (result) {
      fs.unlink("./uploads/" + tempFileName, function (err) {
        if (err) {
          console.log(err);
        } else {
          console.log("Imagem removida com sucesso");
        }
      });
      editAtelierInfo.imagemURL = result.url;
      editAtelierInfo.imagePublicId = result.public_id
      atRef.child(atId).set(editAtelierInfo)
      res.send({
        msg: "O atelier foi editado com sucesso :)",
        information: editAtelierInfo
      });
    });
  }
});

// EVENTS ROUTER

var eventsRef = firebase.database().ref("eventos");
var eventosList, eventosKey, eventosOriginalData;
  var numWorkshops, numEventos, numAtividades, numSessoes;

eventsRef.on("value", function (data) {
  numWorkshops = 0, numEventos = 0, numAtividades = 0, numSessoes = 0;
  eventosList = [];
  eventosKey = [];
  eventosOriginalData = [];
  if (data.val() == null) {
    eventosList = false
  } else {
    eventosOriginalData = data.val();
    eventosKey = Object.keys(data.val())
    var eventosReceivedData = data.val();
    eventosKey.map(function (item) {
      var currentEvent = eventosReceivedData[item];
      eventosList.push(currentEvent);
      switch (currentEvent.tipo) {
        case "Atividade":
          numAtividades++
          break;
        case "Workshop":
          numWorkshops++
          break;
        case "Evento":
          numEventos++
          break;
        case "Sessão":
          numSessoes++
          break;
      }
    });
  }
}, function (err) {
  console.log(err);
});

app.get("/getEvents", function (req, res) {
  res.send({
    "bulkData": eventosOriginalData,
    "events": eventosList,
    "keys": eventosKey
  });
});


app.post("/updateMainEvent", function (req, res) {
  eventsRef.child(req.body.id).child("asMain").set(req.body.mainStatus);
  res.send({
    msg: "Estado do evento atualizado"
  })
});

app.post("/newEvent", function (req, res) {
  let newEventData = req.body
  cloudinary.uploader.upload("./uploads/" + tempFileName, function (result) {
    fs.unlink("./uploads/" + tempFileName, function (err) {
      if (err) {
        console.log(err);
      } else {
        console.log("Imagem removida com sucesso");
      }
    });
    newEventData.imagemURL = result.url;
    newEventData.imagePublicId = result.public_id
    let newEventKey = eventsRef.push(newEventData).key;
    res.send({
      msg: "Novo atelier adicionado com sucesso :)",
      information: {
        "bulkData": {
          newEventKey: newEventData
        },
        "events": newEventData,
        "keys": newEventKey
      }
    });
  });
});

app.delete('/deleteEvent', function (req, res) {
  var id = req.body.id;
  var publicID = req.body.imageID;
  cloudinary.v2.uploader.destroy(publicID, function (error, result) {
    if (error) {
      res.send("Ocorreu o seguinte erro: " + error);
    } else {
      eventsRef.child(id).remove();
      res.send("O seu registo foi eliminado com sucesso");
    }
  });
});

app.post("/editEvent", function (req, res) {
  var eventID = req.body.id;
  var editEventInfo = req.body.information;
  if (req.body.image == false) {
    eventsRef.child(eventID).set(editEventInfo)
    res.send({
      msg: "O evento foi editado com sucesso :)",
      information: editEventInfo
    });
  } else {
    cloudinary.v2.uploader.destroy(editEventInfo.imagePublicId, function (error, result) {
      if (error) {
        res.send("Ocorreu o seguinte erro: " + error);
      }
    });
    cloudinary.uploader.upload("./uploads/" + tempFileName, function (result) {
      fs.unlink("./uploads/" + tempFileName, function (err) {
        if (err) {
          console.log(err);
        } else {
          console.log("Imagem removida com sucesso");
        }
      });
      editEventInfo.imagemURL = result.url;
      editEventInfo.imagePublicId = result.public_id
      eventsRef.child(eventID).set(editEventInfo)
      res.send({
        msg: "O evento foi editado com sucesso :)",
        information: editEventInfo
      });
    });
  }
});

app.get("/getStats", function (req, res) {
  res.send([
    {
      title: "Associados",
      num:  usersList.length
    }, 
    {
      title: "Eventos",
      num: numEventos
    }, 
    {
      title: "Atividades",
      num: numAtividades
    }, 
    {
      title: "Sessões",
      num: numSessoes
    }, 
    {
      title: "Workshops",
      num: numWorkshops
    }, 
  ]);
});


// HISTORA
var timeRef = firebase.database().ref("timeline");
var timeList, timeKey, timeOriginalData;

timeRef.on("value", function (data) {
  timeList = [];
  timeKey = [];
  timeOriginalData = [];
  if (data.val() == null) {
    timeList = false
  } else {
    timeOriginalData = data.val().content;
    if (Object.keys(data.val() != "timelineStats")) {
      timeKey = Object.keys(data.val().content)
    }
    timeStats = data.val().timelineStats;
    timeKey.map(function (item) {
      var currentTime = timeOriginalData[item];
      timeList.push(currentTime);
    });
  }
}, function (err) {
  console.log(err);
});


app.get("/getTimeline", function (req, res) {
  res.send({
    "bulkData": timeOriginalData,
    "timeline": timeList,
    "keys": timeKey,
    "options": timeStats
  });
});

app.post("/updateVisibleTime", function (req, res) {
  timeRef.child("timelineStats").child("visible").set(req.body.updatedNum);
  res.send({
    msg: "Número de marcos visíveis atualizados com sucesso!"
  })
});


app.post("/newTime", function (req, res) {
  let newTimeData = req.body
  cloudinary.uploader.upload("./uploads/" + tempFileName, function (result) {
    fs.unlink("./uploads/" + tempFileName, function (err) {
      if (err) {
        console.log(err);
      } else {
        console.log("Imagem removida com sucesso");
      }
    });
    newTimeData.imagemURL = result.url;
    newTimeData.imagePublicId = result.public_id
    let newTimeKey = timeRef.child("content").push(newTimeData).key;
    res.send({
      msg: "Novo marco adicionado com sucesso :)",
      information: {
        "time": newTimeData,
        "keys": newTimeKey
      }
    });
  });
});


app.delete('/deleteTime', function (req, res) {
  var id = req.body.id;
  var publicID = req.body.imageID;
  cloudinary.v2.uploader.destroy(publicID, function (error, result) {
    if (error) {
      res.send("Ocorreu o seguinte erro: " + error);
    } else {
      timeRef.child("content").child(id).remove();
      res.send("O seu registo foi eliminado com sucesso");
    }
  });
});

app.post("/editTime", function (req, res) {
  var timeID = req.body.id;
  var editTimeInfo = req.body.information;
  if (req.body.image == false) {
    timeRef.child("content").child(timeID).set(editTimeInfo)
    res.send({
      msg: "O marco foi editado com sucesso :)",
      information: editTimeInfo
    });
  } else {
    cloudinary.v2.uploader.destroy(editTimeInfo.imagePublicId, function (error, result) {
      if (error) {
        res.send("Ocorreu o seguinte erro: " + error);
      }
    });
    cloudinary.uploader.upload("./uploads/" + tempFileName, function (result) {
      fs.unlink("./uploads/" + tempFileName, function (err) {
        if (err) {
          console.log(err);
        } else {
          console.log("Imagem removida com sucesso");
        }
      });
      editTimeInfo.imagemURL = result.url;
      editTimeInfo.imagePublicId = result.public_id
      timeRef.child("content").child(timeID).set(editTimeInfo)
      res.send({
        msg: "O marco foi editado com sucesso :)",
        information: editTimeInfo
      });
    });
  }
});

// NEWSLETTER

var newsList, newsKey, newsOriginalData;

newsRef.on("value", function (data) {
  newsList = [];
  newsKey = [];
  newsOriginalData = [];
  if (data.val() == null) {
    newsList = false
  } else {
    newsOriginalData = data.val();
    newsKey = Object.keys(newsOriginalData)
    newsKey.map(function (item) {
      var currentNews = newsOriginalData[item];
      newsList.push(currentNews);
    });
  }
}, function (err) {
  console.log(err);
});


app.get("/getNewsEmails", function (req, res) {
  res.send({
    "bulkData": newsOriginalData,
    "news": newsList,
    "keys": newsKey
  });
});


app.post("/newNewsletterEmail", function (req, res) {
  let newNewsId = newsRef.push(req.body).key;
  res.send({
    msg: "Email adicionado com sucesso :)",
    newNewsletterEmail: {
      id: newNewsId,
      email: req.body.email,
      category: req.body.category
    }
  });
});



app.post("/newsletterRegistration", function (req, res) {
  newsRef.orderByChild("email").equalTo(req.body.email).once("value", (snap) => {
    var queryData = snap.val();
    if (queryData != null) {
      res.send({
        error: true,
        msg:"O email que colocou já se encontra registado na nossa newsletter"
      });
    } else {
      newsRef.push({
        "email": req.body.email,
        "category": 1
      });
      
    // setup email data with unicode symbols
    let mailOptions = {
      from: '"AGIRAR" <info@agirar.pt>', // sender address
      to: req.body.email, // list of receivers
      subject: 'Seja Bem-Vindo 😍', // Subject line
      text: 'BEM-VINDO', // plain text body
      html: {path:"emails/newsletter/welcomeNewsletter_inline.html"} // html body
    };
    
    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
          return console.log(error);
      }
    });
      res.send({
        msg: "Muito obrigado por se registar na newsletter da Agirar!"
      });
    }
  });

});


app.delete("/deleteNewsletterEmail", function (req, res) {
  let deleteId = req.body.id;
  newsRef.child(deleteId).remove();
  res.send("Email eliminado com sucesso!");
});



// PORT LISTENNING
app.listen(port, function () {
  console.log("App is listenning o port " + port);
});