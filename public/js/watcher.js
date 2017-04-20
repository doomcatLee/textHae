function Clock(){
  var alarm;
}

Clock.prototype.getCurrentTime = function(){
  return moment().format("hh:mm:ss a");
}


exports.clockModule = Clock;
