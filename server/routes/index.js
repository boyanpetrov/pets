var router = require('express').Router();

var oauth = require('./auth/oauth');
var api = require('./api')

router.use('/auth', oauth);
router.use('/api', api);

module.exports = router;
