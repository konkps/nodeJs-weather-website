const request = require('request')

const forecast = (lat, long, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=e2faef8b4c3b45505d38c49b3fc6a81f&query='
    + lat + ',' + long

    request({url, json:true},(error, response) => {
        if (error){
            callback('Unable to connect', undefined)
        }else if (response.body.error){
            callback("Unable to find Location", undefined)
        }else{
            callback(undefined, response.body.current.weather_descriptions[0] + 
                '. It is currently ' + response.body.current.temperature 
                + ' degrees with humidity ' + response.body.current.humidity
                + '% and feels like ' + response.body.current.feelslike + '.')
        }      
    })
}

module.exports = forecast