var _ = require('underscore');
var fs = require('fs');

_.templateSettings = {
  interpolate: /\{\{(.+?)\}\}/g
};

function loadTemplate(name) {
  var fileContent = fs.readFileSync('./templates/' + name + '.html', 'utf-8');
  return _.template(fileContent);
}

module.exports.loadTemplate = loadTemplate;