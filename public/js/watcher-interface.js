var Clock = require('../js/watcher.js').clockModule;


$(function(){
  var clock = new Clock();
  console.log(clock.getCurrentTime());
});//jQuery
