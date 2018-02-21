/**
 * Standart libs
 */
var fs = require('fs');
var path = require('path');
var https = require('https');

/*
 * NPM
 */
var express = require('express');
var bodyParser = require('body-parser');
var session = require('express-session');
var passport = require('passport');
var BnetStrategy = require('passport-bnet').Strategy;
var _ = require('lodash');

/**
 * Custom libs
 */
var routes = require('./routes');
var middleware = require('./middleware');
var bnetConfig = require('./config').bnet;
var db = require('./db');
var scheduleTasks  = require('./tasks');

scheduleTasks(db);

passport.use(new BnetStrategy({
    clientID: bnetConfig.key,
    clientSecret: bnetConfig.secret,
    callbackURL: bnetConfig.callbackUrl,
    region: bnetConfig.region
  }, function(accessToken, refreshToken, bnetProfile, done) {
    return done(null, bnetProfile);
  }
));

var app = express();

app.set('db', db);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({ secret: "dinosaur" }));
app.use(passport.initialize());
app.use(passport.session())

passport.serializeUser(function(bnetProfile, done) {
  done(null, bnetProfile);
});

passport.deserializeUser(function(bnetProfile, done) {
  done(null, bnetProfile);
});

app.use(middleware.sessionLogger);

app.use(routes);

var httpApp = express();
var PORT = process.env.PORT || 3000;

httpApp.listen(PORT, function() {
  console.log(`Listening on PORT ${PORT}`);
});

if (process.env.NODE_ENV == 'development' ) {
  var privateKey = fs.readFileSync(path.resolve('cert/key.pem'), 'utf8');
  var certificate = fs.readFileSync(path.resolve('cert/cert.pem'), 'utf8');
  var credentials = { key: privateKey, cert:certificate, passphrase: '1234' };

  httpApp.use((req, res) => {
    res.redirect('https://localhost:3001');
  });

  https.createServer(credentials, app).listen(3001);
}
