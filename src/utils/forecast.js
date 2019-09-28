const request = require('request');

// // Callback
// const forecast = (latitude, longtitude, callback) => {
//   const url = `https://api.darksky.net/forecast/93bb1f769ff433127077be5426bdf38f/${latitude},${longtitude}`;

//   request({ url: url, json: true }, (error, response) => {
//     if(error) {
//       callback('Unable to connect to weather service', undefined)
//     } else if(response.body.error) {
//       callback('Unable to find location', undefined);
//     } else {
//       callback(undefined, `${response.body.daily.data[0].summary} It is currently ${response.body.currently.temperature} degrees out. There is a ${response.body.currently.precipProbability}% chance of rain.`)
//     }
//   });
// }


// refactoring Destructuring
const forecast = (latitude, longtitude, callback) => {
  const url = `https://api.darksky.net/forecast/93bb1f769ff433127077be5426bdf38f/${latitude},${longtitude}`;

  request({ url, json: true }, (error, { body }) => {
    if(error) {
      callback('Unable to connect to weather service', undefined)
    } else if(body.error) {
      callback('Unable to find location', undefined);
    } else {
      callback(undefined, `${body.daily.data[0].summary} It is currently ${body.currently.temperature} degrees out. This high today is ${body.daily.data[0].temperatureHigh} with a low of ${body.daily.data[0].temperatureLow}. There is a ${body.currently.precipProbability}% chance of rain.`)
    }
  });
}

module.exports = forecast