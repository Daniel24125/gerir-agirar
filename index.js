const express = require('express');
const bodyParser = require("body-parser");
const path = require("path");
const fs = require("fs");
const app = express();
const port = process.env.PORT || 9000;
const firebase = require('firebase');
const jwt = require('express-jwt');
const jwks = require('jwks-rsa');

firebase.initializeApp({
    apiKey: process.env.API_KEY,
    authDomain: process.env.AUTH_DOMAIN,
    databaseURL: process.env.DATABASE_URL,
    projectId: process.env.PROJECT_ID,
    storageBucket: process.env.STORAGE_BUCKET,
    messagingSenderId:process.env.MESSAGING_SENDER_ID,
    appId: process.env.APP_ID
})

const jwtCheck = jwt({
    secret: jwks.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: 'https://dev-zokivysz.us.auth0.com/.well-known/jwks.json'
  }),
  audience: 'http://localhost:9000',
  issuer: 'https://dev-zokivysz.us.auth0.com/',
  algorithms: ['RS256']
});



// Add headers
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://agirar.pt');
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  
    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  
    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  
    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    // res.setHeader('Access-Control-Allow-Credentials', true);
  
    // Pass to next layer of middleware
    next();
  });


// PORT LISTENNING
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "build")));


////////////////////////////////////// REFS \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
const usersRef = firebase.database().ref("associados");
const sliderRef = firebase.database().ref("slider");
const ateliersRef = firebase.database().ref("ateliers");
const eventosRef = firebase.database().ref("events");
const historiaRef = firebase.database().ref("historia");

////////////////////////////////////// API \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
app.get('/users/getUsersList', jwtCheck , (req, res, next) => {
    usersRef.once("value", (data) => {
        res.send(data.val())
    }, (err) => {
        console.log(err);
    })    
})

app.post('/user', jwtCheck,  (req, res, next) => {
    usersRef.push(req.body, (error)=>{
        if(error) res.send({
            error: true, 
            data: error
        })
        res.send({
            error: false, 
            data: req.body
        })
    })
})
  
app.patch('/user', jwtCheck, (req, res, next) => {
    usersRef.child(req.body.id).set(req.body.data, (error)=>{
        if(error) res.send({
            error: true, 
            data: error
        })
        res.send({
            error: false, 
            data: req.body
        })
    })
})


app.delete('/user', jwtCheck,  (req, res, next) => {  
    usersRef.child(req.body.id).remove(err=>{
        if(err) res.send({
            error: true
        })
        res.send({
            error: false, 
        })
    })
})

app.get('/slider/getSliderList', (req, res, next) => {
       sliderRef.once("value", (data) => {
        res.send(data.val())
    }, (err) => {
        console.log(err);
    })    
});

app.post('/slider', jwtCheck,(req, res, next) => {
    sliderRef.push(req.body, (error)=>{
        if(error) res.send({
            error: true, 
            data: error
        })
        res.send({
            error: false, 
            data: req.body
        })
    })
});

app.patch('/slider',jwtCheck, (req, res, next) => {
    sliderRef.child(req.body.id).set(req.body.data, (error)=>{
        if(error) res.send({
            error: true, 
            data: error
        })
        res.send({
            error: false, 
            data: req.body
        })
    })
});

app.delete('/slider',jwtCheck, (req, res, next) => {
    sliderRef.child(req.body.id).remove(err=>{
        if(err) res.send({
            error: true
        })
        res.send({
            error: false, 
        })
    })
});

app.get('/ateliers/getAteliersList', (req, res, next) => {
    ateliersRef.once("value", (data) => {
        res.send(data.val())
    }, (err) => {
        console.log(err);
    })    
});

app.post('/ateliers', jwtCheck,(req, res, next) => {
    ateliersRef.push(req.body, (error)=>{
        if(error) res.send({
            error: true, 
            data: error
        })
        res.send({
            error: false, 
            data: req.body
        })
    })
});

app.patch('/ateliers',jwtCheck, (req, res, next) => {
    ateliersRef.child(req.body.id).set(req.body.data, (error)=>{
        if(error) res.send({
            error: true, 
            data: error
        })
        res.send({
            error: false, 
            data: req.body
        })
    })
});

app.delete('/ateliers',jwtCheck,(req, res, next) => {
    ateliersRef.child(req.body.id).remove(err=>{
        if(err) res.send({
            error: true
        })
        res.send({
            error: false, 
        })
    })
});

app.get('/eventos/getEventosList', (req, res, next) => {
      eventosRef.once("value", (data) => {
        res.send(data.val())
    }, (err) => {
        console.log(err);
    })     
});

app.post('/eventos', jwtCheck,(req, res, next) => {
    eventosRef.push(req.body, (error)=>{
        if(error) res.send({
            error: true, 
            data: error
        })
        res.send({
            error: false, 
            data: req.body
        })
    })
});

app.patch('/eventos', jwtCheck,(req, res, next) => {
    eventosRef.child(req.body.id).set(req.body.data, (error)=>{
        if(error) res.send({
            error: true, 
            data: error
        })
        res.send({
            error: false, 
            data: req.body
        })
    })
});

app.delete('/eventos',jwtCheck, (req, res, next) => {
    eventosRef.child(req.body.id).remove(err=>{
        if(err) res.send({
            error: true
        })
        res.send({
            error: false, 
        })
    })
});

app.get('/hist/getHistList', (req, res, next) => {
       historiaRef.once("value", (data) => {
        res.send(data.val())
    }, (err) => {
        console.log(err);
    })    
});

app.post('/hist', jwtCheck,(req, res, next) => {
    historiaRef.push(req.body, (error)=>{
        if(error) res.send({
            error: true, 
            data: error
        })
        res.send({
            error: false, 
            data: req.body
        })
    })
});

app.patch('/hist',jwtCheck,(req, res, next) => {
    historiaRef.child(req.body.id).set(req.body.data, (error)=>{
        if(error) res.send({
            error: true, 
            data: error
        })
        res.send({
            error: false, 
            data: req.body
        })
    })
});

app.delete('/hist', jwtCheck,(req, res, next) => {
    historiaRef.child(req.body.id).remove(err=>{
        if(err) res.send({
            error: true
        })
        res.send({
            error: false, 
        })
    })
});

app.get('*', function (req, res, next) {
    res.sendFile(path.join(__dirname, "build/index.html"))     
  });

app.listen(port, function () {
    console.log("App is listenning o port " + port);
  });