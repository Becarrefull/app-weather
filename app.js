var express = require('express');
var app = express();

var request = require('request');


app.get('/', function(req, res){
  request('https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22nome%2C%20ak%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys', function(error, response, body){
    if (error) {
      res.send('this request send an error');
    } else {
      var result = JSON.parse(body);
      res.send(result['query']['results']['channel']['item']['condition']);
    }
  })
});

app.listen(3000);