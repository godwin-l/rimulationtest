var mongoose = require('mongoose');
var app = process.cwd() + '/app/';
var config = require(app + 'config/config');
var connect = process.env.MONGO_URL || config.get('mongoose:uri');
var options = {
  replset: {
    socketOptions: {
      keepAlive: 120
    }
  },
  server: {
    poolSize: 5,
    reconnectTries: 10,
    socketOptions: {
      keepAlive: 120
    }
  }
};
console.log(connect);
mongoose.connect(connect, options);
var db = mongoose.connection;
db.on('error', function(err) {});
db.once('open', function callback() {});

module.exports = mongoose;
