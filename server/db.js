var config = require('./config');

// Proper way to initialize and share the Database object

// Loading and initializing the library:
const pgp = require('pg-promise')({
    // Initialization Options
});

// Preparing the connection details:
const cn = `postgres://${config.db.userId}:${config.db.password}@${config.db.host}:${config.db.port}/${config.db.database}`;

// Creating a new database instance from the connection details:
const db = pgp(cn);

// Exporting the database object for shared use:
module.exports = db;
