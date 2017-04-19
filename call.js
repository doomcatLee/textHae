
var client = require('twilio')(
  'ACca9625d5004aecd333d236abdf521852',
  'c4e7a3fb6a522a073e18423a04ac181c'
);

module.exports.makeCall = function(){
  client.calls.create({
    url: "http://demo.twilio.com/docs/voice.xml",
    to: "+15039983176",
    from: "+19713402317"
  }, function(err, call) {
    process.stdout.write(call.sid);
  });
}
