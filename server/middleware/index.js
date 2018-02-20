var _ = require('lodash');

function sessionLogger(req, res, next) {
  console.log(req.session);
  next();
}

function requiresLogin(req, res, next) {
  if (!_.has(req, 'session.passport.user.id')) {
    return res.redirect('/');
  } else {
    return next();
  }
}

module.exports = {
  sessionLogger,
  requiresLogin,
};
