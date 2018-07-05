var router = require('express').Router();
var passport = require('passport');

router.get('/bnet', passport.authenticate('bnet', { scope: ["wow.profile"] }));

router.get('/bnet/callback',
  passport.authenticate('bnet', { failureRedirect: '/fail' }),
  function(req, res) {
    res.redirect('/');
  }
);

module.exports = router;
