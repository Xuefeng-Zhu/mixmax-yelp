// for demo purpose, use your own key for production

var Yelp = require('yelp');

var yelpConfig = {
  consumer_key: 'zrkDj9IweiTg5exgec8BQg',
  consumer_secret: '2aAxxcLoanvcu-kM0bxIRXcJMTw',
  token: 'QWPoFTQfNOQWu-CqP5X8jCOJ7W2njuFq',
  token_secret: 'DupDQ_5lWQ_gPTUytVG5Gucxus0',
}

module.exports = {
  yelp: new Yelp(yelpConfig)
};