
var client = require('twilio')(
  'ACca9625d5004aecd333d236abdf521852',
  'c4e7a3fb6a522a073e18423a04ac181c'
);

module.exports.sendSms = function(to,body){
  client.messages.create({
    from: '+19713402317',
    to: to,
    body: body,
    mediaUrl: 'https://pbs.twimg.com/profile_images/378800000822867536/3f5a00acf72df93528b6bb7cd0a4fd0c.jpeg',
  }, function(err, message){
    if (err) {
      console.error(err.message);
    }
  });
}
