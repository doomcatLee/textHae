'use strict';

// simple express server
var http = require('http');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var sms = require('./public/js/sms.js');
var request = require('request');
var translateObject = require('./public/js/translate.js');

var router = express.Router();

//THIS IS SO YOU CAN TAKE HTML FORM DATA INTO APP.JS
app.use(express.static('public'));
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({
  extended: true
})); // support encoded bodies

// // DAT MIDDLEWARE SHIT
// //First middleware before response is sent
// app.use(function(req, res, next){
// 	console.log("Start");
// 	next();
// });
// //Route handler
// app.get('/', function(req, res, next){
// 	res.send("Middle");
// 	next();
// });
//
// app.use('/', function(req, res){
// 	console.log('End');
// });


//ROUTES FOR HTML
app.get('/', function(req, res) {
  res.sendfile('./public/index.html');
});

app.get('/dashboard', function(req, res) {
  res.sendfile('./public/dashboard.html');
});

app.get('/call', function(req, res) {
  res.sendfile('./public/call.html');
});

app.post('/call', function(req, res) {
  var phoneNumber = req.body.phone_number;
  console.log("Your Number" + req.body.phone_number);
  res.sendfile('./public/index.html');
});

//
// app.post('/message', function(req, res) {
//   var message = req.body.message;
//   sms.sendSms(message);
//   translateObject.translate(message);
//   console.log(message);
//
//   res.sendfile('./public/index.html');
// });

app.get('/translate', function(req, res) {
  var jsonObject = request('http://www.transltr.org/api/translate?text=what%20is%20your%20name%3F&to=ko', function(error, response, body) {
    if (!error && response.statusCode == 200) {
      var formattedJSON = JSON.parse(body); //Turn dat string into JSON
      console.log(formattedJSON.translationText);
    }
  }).pipe(res);
});

app.get('/schedule', function(req, res) {
  res.sendfile('./public/schedule.html');
});

// //grab ID from url
// app.get('/:id', function(req, res) {
//   res.send('Current ID: ' + req.params.id);
// });


//ANY OTHER ROUTES, HANDLE ERROR
app.get('*', function(req, res) {
  res.send('Sorry, this is an invalid URL.');
});

//Simple request time logger, displays in console of request times.
app.use(function(req, res, next) {
  console.log("A new request received at " + Date.now());
  //This function call is very important. It tells that more processing is
  //required for the current request and is in the next middleware function/route handler.
  next();
});



app.listen(4200);
