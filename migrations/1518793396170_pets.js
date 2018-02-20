exports.up = (pgm) => {
 pgm.sql(`
  CREATE TABLE pets(
    can_battle BOOLEAN,
    creature_id INT PRIMARY KEY,
    name VARCHAR(255),
    family VARCHAR(255),
    icon VARCHAR(255),
    quality_id INT,
    strong_against VARCHAR(255)[],
    type_id INT,
    weak_against VARCHAR(255)[],
    species_id INT,
    breed_id INT,
    pet_quality_id INT,
    level INT,
    health INT,
    power INT,
    speed INT)
  `);
};

exports.down = (pgm) => {
  pgm.sql(`DROP TABLE pets`);
};
