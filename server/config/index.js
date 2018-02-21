var config = require('./development');

if (process.env.NODE_ENV == 'production') {
  config = require('./production');
} else if (process.env.NODE_ENV == 'ci') {
  config = require('./ci');
}

if (process.env.NODE_ENV != 'ci') {
  var bnetApi = require('./bnetApi');
  config.bnet = bnetApi;
}

module.exports = config;
