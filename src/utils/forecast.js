const request = require('request');

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=707c82021ed4477187d56a6a0dc80fbb&query=' + latitude + ',' + longitude+'&units=f'

    request({url, json:true}, (error,{body})=>{
        if (error) {
            callback('unable to connect to the weather server',undefined)
        } else if (body.error) {
            callback('location unknown',undefined)
        }
        else {
            callback(undefined,' the tempreature is '+body.current.temperature+' and the time is: '+ body.location.localtime)
        }
    })
}


module.exports = forecast