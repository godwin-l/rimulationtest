var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var db = require('./app/db/mongoose');
var fs = require('fs');
var config = require('./app/config/config');
var user = require('./app/controllers/user-controller');
var token = require('./app/controllers/tokencontroller');
var blog = require('./app/controllers/blogcontroller');
var discussion=require('./app/controllers/discussioncontroller');
var app = express();
const authentication = require('./app/auth')
const publicCert = fs.readFileSync('key/public.pem');
// Requires setup for auth module
const issuer = config.get('auth:issuer');
const audience = config.get('auth:aud')
const securedurl = config.get('auth:securedurl')
authentication.setup({
  app: app,
  securedURL: securedurl,
  issuer: issuer,
  audience: audience,
  signCert: publicCert
});
app.use('/api/*', authentication.authenticate);

// Define the port to run on
app.set('port', process.env.PORT);
if (!app.get('port')) {
  app.set('port', 3000);

}
app.use("/", express.static(path.join(__dirname, 'public')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use('/api/users', user);
app.use('/api/secured/users', user);
app.use('/api/secured/authorize/users', user);
app.use('/api/discussion', discussion);
app.use('/api/secured/discussion', discussion);
app.use('/api/secured/authorize/discussion', discussion);
app.use('/api/token', token);
app.use('/api/secured/token', token);
app.use('/api/secured/authorize/token', token);
app.use('/api/blog', blog);
app.use('/api/secured/blog', blog);
app.use('/api/secured/authorize/blog', blog);

app.use("/*",function(req,res,next){
  res.sendFile(path.join(__dirname, '/public/html/index.html'));
})// Listen for requests
/*app.use("/*", function(req, res, next) {
  console.log(req.get('host'));
  var host=req.get('host') || req.get('origin')
  if (req.headers['x-forwarded-proto'] !== 'https') {
    res.redirect("https://"+host + req.url);
  } else {
    res.sendFile(path.join(__dirname, '/public/html/index.html'));
  }
});*/
var server = app.listen(app.get('port'), function() {
  var port = server.address().port;
  console.log('Magic happens on port ' + port);
});
