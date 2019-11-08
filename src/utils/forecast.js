const request = require('request')


const forecast = (latitude, longitude, callback) => {

    const url = 'https://api.darksky.net/forecast/91506f70448e42a3abadf06198f8bb4c/'+ latitude + ', ' + longitude + '?units=si'

    request({ url, json: true }, (error, { body }) => {
        if (error){
            callback('Unable to connect to weather service!', undefined)
        } else if (body.error) {
            callback('Check your coordinates', undefined)
        } else {
            //console.log(body.currently)
            callback(undefined, 'It is currently ' + body.currently.temperature + ' degrees out. There is ' + body.currently.precipProbability + '% chance of rain and '+ body.currently.humidity + 'of humidity!')
            // callback(undefined, body.daily.data[0].summary)
        }
    })
}

module.exports = forecast

//
// Goal: Add new data to forecast
//
// 1. Update the forecaste string inlcude new data
// 2. Commit your changes
// 3. Push your changes to GitHub and deploy to Heroku
// 4. Test your work in the live application!