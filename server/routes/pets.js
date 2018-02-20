var router = require('express').Router();
var STATUS_CODES = require('http').STATUS_CODES;
var _ = require('lodash');

var middleware = require('../middleware');
var template = require('../lib/template');

var pets = require('../models/pets');

router.get('/pets', [middleware.requiresLogin], (req, res) => {
  var db = req.app.get('db');
  pets.getAll(db)
    .then(data => template.render('pets', { pets: data }))
    .then(output => res.send(output))
    .catch(err => {
      console.log(err);
      if (err instanceof bnet.errors.BnetRequestError) {
        return res.status(500).send(`Couldn't retrieve pets from battle.net`);
      }
      return res.status(500).send(STATUS_CODES[500]);
    });
});

router.get('/pets/:id', [middleware.requiresLogin], (req, res) => {
  if (!_.has(req, 'params.id')) {
    return res.status(400).send('leave it blank for now');
  }

  var db = req.app.get('db');
  var id = req.params.id;

  Promise.all([
      pets.getAll(db),
      pets.getPetById(id, db)
    ])
    .then(([pets, pet]) => {
      var context = {
        strengths: [],
        weaknesses: [],
        pet,
      }

      pets.forEach(function(p) {
        if (_.includes(context.pet.strong_against, p.family)) context.strengths.push(p);
        else if (_.includes(context.pet.weak_against, p.family)) context.weaknesses.push(p);
      });

      return context;
    })
    .then(data => template.render('petDetail', data))
    .then(output => res.send(output))
    .catch(err => {
      console.log(err);
      return res.status(500).send(STATUS_CODES[500]);
    });
});

module.exports = router;
