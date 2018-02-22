var router = require('express').Router();
var STATUS_CODES = require('http').STATUS_CODES;
var _ = require('lodash');

var template = require('../lib/template');

var oauth = require('./oauth');
var pets = require('./pets');
var characters = require('./characters');

router.use(oauth);
router.use(characters);
router.use(pets);

router.get('/', (req, res) => {
  var context = {};

  if (_.has(req, 'session.passport.user.battletag')) {
    context.battletag = req.session.passport.user.battletag;
  }

  return template.render('index', context)
    .then(output => {
      req.log.info(`Sending STATUS_CODE:200 ...`);
      return res.send(output);
    })
    .catch(err => {
      req.log.error(err);
      return res.status(500).send(STATUS_CODES[500]);
    });
});

router.get('/ping', (req, res) => {
  res.send('pong');
});

module.exports = router;
