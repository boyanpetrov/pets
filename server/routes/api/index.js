var router = require('express').Router();

var characters = require('./characters');
var pets = require('./pets');
var user = require('./user');

router.use(characters);
router.use(pets);
router.use(user);

module.exports = router;
