'use strict';

// simple express server
var http = require('http');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var sms = require('./public/js/sms.js');
var request = require('request');
var router = express.Router();

//THIS IS SO YOU CAN TAKE HTML FORM DATA INTO APP.JS
app.use(express.static('public'));
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({
  extended: true
})); // support encoded bodies


//ROUTES FOR HTML
app.get('/', function(req, res) {
  res.sendfile('./public/index.html');
});




app.post('/message', function(req, res) {
  var message = req.body.message;
  var toPhoneNumber = req.body.toPhoneNumber;
  sms.sendSms(toPhoneNumber, message);
  console.log(message);

  res.sendfile('./public/index.html');
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
