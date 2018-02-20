var expect = require('chai').expect;

var db = require('../../server/db');
var pets = require('../../server/models/pets');

describe('Integration tests', function() {
  beforeEach(function() {
    var pets = [
      {"canBattle": true, "creatureId": 17254, "name": "Ash'ana", "family": "beast", "icon": "ability_mount_whitetiger", "qualityId": 4, "speciesId": 1927, "breedId": 3, "petQualityId": 1, "level": 1, "health": 147, "power": 10, "speed": 9, "strongAgainst": ["critter"], "typeId": 7, "weakAgainst": ["flying"] },
      {"canBattle": true, "creatureId": 120830, "name": "Ban-Fu, Cub of Ban-Lu", "family": "beast", "icon": "inv_tigergodcubmonk", "qualityId": 4, "speciesId": 2047, "breedId": 3, "petQualityId": 1, "level": 1, "health": 147, "power": 10, "speed": 9, "strongAgainst": ["critter"], "typeId": 7, "weakAgainst": ["flying"] },
      {"canBattle": true, "creatureId": 119498, "name": "Bloodbrood Whelpling", "family": "undead", "icon": "inv_pet_dkwhelplingblood", "qualityId": 4, "speciesId": 2035, "breedId": 3, "petQualityId": 1, "level": 1, "health": 147, "power": 9, "speed": 9, "strongAgainst": ["humanoid"], "typeId": 3, "weakAgainst": ["water"] },
      {"canBattle": true, "creatureId": 106270, "name": "Celestial Calf", "family": "magical", "icon": "inv_pet_celestialbabyhippo", "qualityId": 4, "speciesId": 1888, "breedId": 3, "petQualityId": 1, "level": 1, "health": 147, "power": 9, "speed": 9, "strongAgainst": ["flying"], "typeId": 5, "weakAgainst": ["water"]}
    ];
    var query = 'INSERT INTO pets(can_battle, creature_id, name, family, icon, quality_id, species_id, breed_id, pet_quality_id, level, health, power, speed, strong_against, type_id, weak_against)\
      VALUES (${canBattle}, ${creatureId}, ${name}, ${family}, ${icon}, ${qualityId}, ${speciesId}, ${breedId}, ${petQualityId}, ${level}, ${health}, ${power}, ${speed}, ${strongAgainst}, ${typeId}, ${weakAgainst})';
    return Promise.all([
      db.none(query, pets[0]),
      db.none(query, pets[1]),
      db.none(query, pets[2]),
      db.none(query, pets[3])
    ]);
  });

  afterEach(function() {
    return db.none('DELETE FROM pets;');
  });

  after(function() {
    return db.$pool.end();
  });

  describe('.getAll()', function() {
    it('should return all pets from the DB', function() {
      return pets.getAll(db).then(function(result) {
        expect(result).to.have.lengthOf(4);
      });
    });
  });
});

