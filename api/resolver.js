var _ = require('underscore');
var yelp = require('../config.js').yelp;
var errorTemplate = _.template('<p><%= text%></p>');
var resolverTemplate = _.template(
  '<img style="height:75px" src="<%= snippet_image_url %>">');


// The API that returns the in-email representation.
module.exports = function(req, res) {
  var term = req.query.text.trim();

  yelp.business(term)
  .then(function(response) {
    res.json({
      subject: response.name,
      body: resolverTemplate(response)
    });
  })
  .catch(function(response) {
    var error = JSON.parse(response.data).error;
    res.json({
      subject: 'Error',
      body: errorTemplate(error)
    });
  });
};
