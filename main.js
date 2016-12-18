var fetch = require('isomorphic-fetch');
var nodemailer = require('nodemailer');

var getMeteoReport = (location) => {
  const apiKey = 'fbe2c0e676679776b5de03ed5b309cce';
  const queryUri = 'http://api.openweathermap.org/data/2.5/weather?q=' +
                    location + '&APPID=' + apiKey;
  return fetch(queryUri).then((response) => {
    if (response.status >= 400) {
      throw new Error('Bad response from server');
    }
    return response.json();
  }).then((json) => "Weather will be " + json.weather[0].description +
                    " in " + location);
};

var sendMail = (report, mail) => {
  var transporter = nodemailer.createTransport('smtps://rentacarcodinginterview%40gmail.com:dummydummy@smtp.gmail.com');

  // setup e-mail data with unicode symbols
  var mailOptions = {
    from: '"Pierre de Wulf" <pierredewulf31@gmail.com>', // sender address
    to: mail, // list of receivers
    subject: 'Your weather report', // Subject line
    text: report // plaintext body
  };

  transporter.sendMail(mailOptions);
};

module.exports = function (context, cb) {
  var city = context.data.city;
  var mail = context.data.mail;
  getMeteoReport(city).then(function (weather) {
    sendMail(weather, mail);
  });
};
