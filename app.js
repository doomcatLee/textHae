'use strict';

// simple express server
var express = require('express');
var app = express();
var router = express.Router();

app.use(express.static('public'));

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
//

app.get('/dashboard', function(req, res){
    res.render('');
});

app.get('/', function(req, res) {
    res.sendfile('./public/index.html');
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

//Simple request time logger
app.use(function(req, res, next){
	console.log("A new request received at " + Date.now());
	//This function call is very important. It tells that more processing is
	//required for the current request and is in the next middleware function/route handler.
	next();
});



app.listen(4200);
