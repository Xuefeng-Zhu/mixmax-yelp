var express = require('express');
var cors = require('cors');

// Since Mixmax calls this API directly from the client-side, it must be whitelisted.
var corsOptions = {
  origin: /^[^.\s]+\.mixmax\.com$/,
  credentials: true
};

var app = express();

app.get('/typeahead', cors(corsOptions), require('./api/typeahead'));
app.get('/resolver', cors(corsOptions), require('./api/resolver'));

if (process.env.PROD) {
  app.listen(process.env.PORT || 9145);
} else {
  var pem = require('pem');
  var https = require('https');
  pem.createCertificate({days:1, selfSigned:true}, function(err, keys){
    https.createServer({key: keys.serviceKey, cert: keys.certificate},
      app).listen(process.env.PORT || 9145);
  });
}