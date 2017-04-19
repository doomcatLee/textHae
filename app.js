'use strict';

// simple express server
var express = require('express');
var app = express();
var router = express.Router();

app.use(express.static('public'));

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

app.get('/things/:id([0-9]{5})', function(req, res){
    res.send('id: ' + req.params.id);
});

app.get('*', function(req, res){
    res.send('Sorry, this is an invalid URL.');
});


app.listen(4200);
