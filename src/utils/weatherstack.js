const request = require('request');


const weatherstack = (address, callback)=>{
    const url = `http://api.weatherstack.com/current?access_key=5ac0f8ef7eed547aa79135a7971d92d1&query=${address[0][1]},${address[0][0]}`;
    request({url, json: true}, (err, res) => {
        if(err){
            callback('No Internet connection', undefined)
        }else if(res.body.error){
            callback('please provide a valid location', undefined)
        }else{
            callback(undefined, [`It is ${res.body.current.temperature}, but it feels like ${res.body.current.feelslike}`, res.body.location.name])
        }
    })
}

module.exports = weatherstack