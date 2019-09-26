const request = require('request');

// // Callback
// const geocode = (address, callback) => {
//   const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ address +  '.json?access_token=pk.eyJ1IjoibWNmb3J0ZSIsImEiOiJjazB1eG0yMTQwMzg0M21sYWN3c3NhdDU0In0.VQdxEAwjjXr6TSUCA_1szw&limit=1';

//   request({ url: url, json: true }, (error, response) => {
//     if(error) {
//       callback('Unable to connect to location services', undefined)
//     } else if (response.body.features.length === 0) {
//       callback('unable to find Location, Try Another Search', undefined)
//     } else {
//       callback(undefined, {
//         latitude: response.body.features[0].center[1],
//         longtitude: response.body.features[0].center[0],
//         location: response.body.features[0].place_name
//       })
//     }
//   });
// }

// Refactoring to Destructuring 
const geocode = (address, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=pk.eyJ1IjoibWNmb3J0ZSIsImEiOiJjazB1eG0yMTQwMzg0M21sYWN3c3NhdDU0In0.VQdxEAwjjXr6TSUCA_1szw&limit=1`;

  request({ url, json: true }, (error, { body }) => {
    if(error) {
      callback('Unable to connect to location services', undefined)
    } else if (body.features.length === 0) {
      callback('Unable to find Location, Try Another Search', undefined)
    } else {
      callback(undefined, {
        latitude: body.features[0].center[1],
        longtitude: body.features[0].center[0],
        location: body.features[0].place_name
      })
    }
  });
}

module.exports = geocode