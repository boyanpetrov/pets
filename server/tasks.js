var cron = require('node-cron');
var bnet = require('./lib/bnetApi');
var pets = require('./models/pets');

function updatePets(db) {
  return bnet.getWoWPets()
    .then(response => {
      return pets.refresh(response.pets, db);
    });
}

function scheduleTasks(db) {
  updatePets(db);

  cron.schedule('0 */6 * * *', function() {
    updatePets(db)
      .then(() => console.log('*** pets list auto updated'))
      .catch(err => console.log(err));
  });
}

module.exports = scheduleTasks;
