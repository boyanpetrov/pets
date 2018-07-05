var router = require('express').Router();
var STATUS_CODES = require('http').STATUS_CODES;

var _ = require('lodash');
var middleware = require('../../middleware');
var bnet = require('../../lib/bnetApi');
var logger = require('../../lib/logger');

router.get('/characters', [middleware.requiresLogin], (req, res) => {
  bnet.getWoWCharacters(req.session.passport.user.token)
    .then(data => res.send(data))
    .catch(err => {
      logger.error({ err });
      if (err instanceof bnet.errors.BnetRequestError) {
        return res.status(500).send(`Couldn't characters from battle.net`);
      }
      return res.status(500).send(STATUS_CODES[500]);
    });
});

router.get('/realm/:realm/characters/:name', (req, res) => {
  if (!_.has(req, 'params.realm') || !_.has(req, 'params.name') ) {
    return res.status(400).send('leave it blank for now');
  }

  var realm = req.params.realm;
  var name = req.params.name;
  var fields = ['pets'];

  bnet.getWoWCharacterProfile(realm, name, fields)
    .then(data => res.send(data.character))
    .catch(err => {
      logger.error({ err });
      if (err instanceof bnet.errors.BnetRequestError) {
        return res.status(500).send(`Couldn't retrieve character profile from battle.net`);
      }
      return res.status(500).send(STATUS_CODES[500]);
    });
});

module.exports = router;
