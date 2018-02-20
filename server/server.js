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
var config = require('./config/bnetApi');
var db = require('./db');
var scheduleTasks  = require('./tasks');

scheduleTasks(db);

var privateKey = fs.readFileSync(path.resolve('cert/key.pem'), 'utf8');
var certificate = fs.readFileSync(path.resolve('cert/cert.pem'), 'utf8');
var credentials = { key: privateKey, cert:certificate, passphrase: '1234' };

passport.use(new BnetStrategy({
    clientID: config.key,
    clientSecret: config.secret,
    callbackURL: config.callbackUrl,
    region: config.region
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

var httpsServer = https.createServer(credentials, app);

var httpApp = express();

httpApp.use((req, res) => {
  res.redirect('https://localhost:3001');
});

httpApp.listen(3000);
httpsServer.listen(3001);
