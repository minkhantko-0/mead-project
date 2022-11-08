const request = require('request');
const chalk = require('chalk');

const forecast = (latitude, longitude, name, callback) => {
    const weatherApiUrl = `http://api.weatherapi.com/v1/current.json?key=3bfb676ae1cb42acaf375246222809&aqi=no&lang=en&q=${latitude},${longitude}`;

    request({ url: weatherApiUrl, json: true }, (error, response) => {
        if (error) {
            callback('Unable to connect to the internet!', undefined);
        } else if (response.body.error) {
            callback('Unable to find location!', undefined);
        } else {
            const data = response.body.current;
            callback(undefined, {
                address: name,
                condition: data.condition.text,
                temperature: data.temp_f,
            });
        }
    });
};

module.exports = forecast;
