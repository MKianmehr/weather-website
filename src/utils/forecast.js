const geo = require('./geo.js')
const weatherstack = require('./weatherstack.js');

const forecast = (address, callback) => {
    geo(address, (error, response) => {
        if(error) {
                callback(error, undefined);
        }else{
            weatherstack(response, (err, res)=>{
                if(err){
                    callback(err, undefined);
                }else{
                    callback(undefined, res);
                }
            })
        }
    })
}


module.exports = forecast;