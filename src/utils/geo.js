const request = require('request')
const weatherstack = require('./weatherstack.js')


const geo = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoibW9oYW1tYWQyMzA2IiwiYSI6ImNrdmR4aGJneTB6aHUyd284bG95amNhMWwifQ.3puFHHTDWcPv4bDp1UH5Vg`;
    request({url, json: true}, (err, res) => {
        if(err){
            callback('No internet connection', undefined);
        }else if(res.body.message){
            callback('please provide a valid location', undefined);
        }else if(res.body.features.length === 0){
            callback('please provide a valid location', undefined);
        }else{
            callback(undefined,[res.body.features[0].center, res.body.features[1].place_name])
        }
})
}

module.exports = geo;