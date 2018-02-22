var _ = require('lodash');
var logger = require('../lib/logger');

function requiresLogin(req, res, next) {
  if (!_.has(req, 'session.passport.user.id')) {
    return res.redirect('/');
  } else {
    return next();
  }
}

function requestLogger(req, res, next) {
  logger.info({ req });
  return next();
}

module.exports = {
  requiresLogin,
  requestLogger
};
