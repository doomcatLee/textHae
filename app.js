'use strict';

// simple express server
var http = require('http');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var sms = require('./sms.js');

var router = express.Router();

//THIS IS SO YOU CAN TAKE HTML FORM DATA INTO APP.JS
app.use(express.static('public'));
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

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


app.get('/message', function(req, res) {
    res.sendfile('./public/message.html');
});

app.post('/message', function(req, res) {
    var message = req.body.message;
    sms.sendSms(message);
    console.log(message);

    res.sendfile('./public/index.html');
});

app.get('/schedule', function(req, res) {
    res.sendfile('./public/schedule.html');
});

//grab ID from url
app.get('/:id', function(req, res){
    res.send('Current ID: ' + req.params.id);
});




//nested routing
app.get('/:name/:id', function(req, res){
    res.send('id: ' + req.params.id + ' and name: ' + req.params.name);
});

//regex NEED the id to be five digits long number.
app.get('/things/:id([0-9]{5})', function(req, res){
    res.send('id: ' + req.params.id);
});

//ANY OTHER ROUTES, HANDLE ERROR
app.get('*', function(req, res){
    res.send('Sorry, this is an invalid URL.');
});

//Simple request time logger, displays in console of request times.
app.use(function(req, res, next){
	console.log("A new request received at " + Date.now());
	//This function call is very important. It tells that more processing is
	//required for the current request and is in the next middleware function/route handler.
	next();
});

// http.createServer(function (req, res) {
//     //Create TwiML response
//     var twiml = new twilio.TwimlResponse();
//     twiml.say("Hello from your pals at Twilio! Have fun.");
//
//     res.writeHead(200, {'Content-Type': 'text/xml'});
//     res.end(twiml.toString());
//
// }).listen(1337, '127.0.0.1');



app.listen(4200);
