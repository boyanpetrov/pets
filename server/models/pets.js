function refresh(pets, db) {
  return db.tx(t => {
    t.none('DELETE FROM pets;');

    const queries = pets.map(pet => {
      for (let key in pet.stats) {
        pet[key] = pet.stats[key];
      }
      delete pet.stats;

      return t.none('\
        INSERT INTO pets(can_battle, creature_id, name, family, icon, quality_id, species_id, breed_id, pet_quality_id, level, health, power, speed, strong_against, type_id, weak_against)\
        VALUES (${canBattle}, ${creatureId}, ${name}, ${family}, ${icon}, ${qualityId}, ${speciesId}, ${breedId}, ${petQualityId}, ${level}, ${health}, ${power}, ${speed}, ${strongAgainst}, ${typeId}, ${weakAgainst})',
        pet
      );
    });

    return t.batch(queries);
  });
}

function getAll(db) {
  return db.any('SELECT * FROM pets;');
}

function getPetById(id, db) {
  return db.one('SELECT * FROM pets WHERE creature_id = $1', id);
}

module.exports = {
  refresh,
  getAll,
  getPetById,
};
