var fetch = require('isomorphic-fetch');

var getMeteoReport = (location) => {
  const apiKey = 'fbe2c0e676679776b5de03ed5b309cce';
  const queryUri = 'http://api.openweathermap.org/data/2.5/weather?q=' +
                    location + '&APPID=' + apiKey;
  return fetch(queryUri).then((response) => {
    if (response.status >= 400) {
      throw new Error('Bad response from server');
    }
    return response.json();
  }).then((json) => json.weather[0].description);
};

module.exports = function (context, cb) {
  var city = context.data.city;
  var mail = context.data.mail;
  getMeteoReport (city).then(function (weather) {
    cb(null, weather);
  });
};
