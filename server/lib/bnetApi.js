var url = require('url');

var config = require('../config/bnetApi');
var axios = require('axios');
var _ = require('lodash');

class BnetRequestError extends Error {
  constructor(statusCode, url, message) {
    super(`Request to bnet API URL:${url} failed with STATUS_CODE:${statusCode} and reason:${message}`);
    this.STATUS_CODE = statusCode;
    this.URL = url;
    this.reason = message;
  }
}

function BnetErrorHandler(err) {
  var error;

  if (_.has(err, 'response.data.code') && _.has(err, 'response.data.detail')) {
    var code = err.response.data.code;
    var url = err.request.path;
    var message = err.response.data.detail;
    error = new BnetRequestError(code, url, message);
  }

  return error || err;
}

function getWoWCharacters(accessToken) {
  var route = '/wow/user/characters';
  var u = url.format({
    host: 'eu.api.battle.net',
    pathname: route,
    query: { access_token: accessToken },
    protocol: 'https'
  });

  return axios.get(u)
    .then(response => {
      var data = {
        characters: [],
      };

      if (_.has(response, 'data.characters') && _.isArray(response.data.characters)) {
        data.characters = response.data.characters;
      }

      return data;
    })
    .catch(err => Promise.reject(BnetErrorHandler(err)));
}

function getWoWPets() {
  var route = 'eu.api.battle.net';
  var u = url.format({
    host: route,
    pathname: '/wow/pet/',
    query: {
      locale: 'en_GB',
      apikey: config.key
    },
    protocol: 'https'
  });

  return axios.get(u)
    .then(response => {
      var data = {
        pets: [],
      };

      if (_.has(response, 'data.pets') && _.isArray(response.data.pets)) {
        data.pets = response.data.pets;
      }

      return data;
    })
    .catch(err => Promise.reject(BnetErrorHandler(err)));
}

function getWoWCharacterProfile(realm, name, fields) {
  var route = 'eu.api.battle.net';
  if (fields == undefined) {
    fields = '';
  } else {
    fields = fields.join(',');
  }

  var u = url.format({
    host: route,
    pathname: `/wow/character/${realm}/${name}`,
    query: {
      fields,
      locale: 'en_GB',
      apikey: config.key
    },
    protocol: 'https'
  });

  return axios.get(u)
    .then(response => ({ character: response.data }))
    .catch(err => Promise.reject(BnetErrorHandler(err)));
}

module.exports = {
  getWoWCharacters,
  getWoWPets,
  getWoWCharacterProfile,
  errors: {
    BnetRequestError,
  },
};
