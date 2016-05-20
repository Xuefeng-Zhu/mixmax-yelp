var _ = require('underscore');
var yelp = require('../config.js').yelp;
var typeaheadTemplate = require('../utils').loadTemplate('typeahead');

module.exports = function(req, res) {
  var query = req.query.text.split('in');

  if (query.length !== 2) {
    sendHintRes(res, '<i>(i.g. food in Chicago)</i>');
    return;
  }

  yelp.search({
    term: query[0].trim(),
    location: query[1].trim()
  })
  .then(_.partial(handleResponse, res))
  .catch(function(response) {
    var error = JSON.parse(response.data).error;
    sendHintRes(res, error.text);
  });
};

function sendHintRes(res, title) {
  res.json([{
    title: title,
    text: ''
  }]);
};

function handleResponse(res, response) {
  var results = _.map(response.businesses, function(business) {
      return {
        title: typeaheadTemplate(business),
        text: business.id
      };
    });

  if (results.length) {
    res.json(results);
  } else {
    sendHintRes(res, '<i>(no results)</i>');
  }
};
