var config = require('./development');

if (process.env.NODE_ENV == 'production') {
  config = require('./production');
} else if (process.env.NODE_ENV == 'ci') {
  config = require('./ci');
}

module.exports = config;
