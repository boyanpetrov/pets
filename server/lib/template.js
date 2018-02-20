var fs = require('fs');
var path = require('path');

var Mustache = require('mustache');

function render(filename, context) {
  return new Promise((resolve, reject) => {
    fs.readFile(path.resolve(`server/templates/${filename}.mustache`), 'utf8' ,(err, template) => {
      if (err) return reject(err);
      return resolve(Mustache.render(template, context));
    });
  });
}

module.exports = {
  render,
};
