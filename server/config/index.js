var config = require('./development');
var bnetApi = require('./bnetApi');

if (process.env.NODE_ENV == 'production') {
  config = require('./production');
} else if (process.env.NODE_ENV == 'ci') {
  config = require('./ci');
}

if (process.env.NODE_ENV != 'ci') {
  config.bnet = bnetApi;
}

module.exports = config;
