var router = require('express').Router();
var _ = require('lodash');

router.get('/user', (req, res) => {
  let battletag = null;

  if (_.has(req, 'session.passport.user.battletag')) {
    battletag = req.session.passport.user.battletag;
  }

  return res.send({ user: battletag });
});

module.exports = router;
