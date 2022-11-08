const request = require('request');

const geocode = (address, callback) => {
    const geocodingUrl = `http://api.positionstack.com/v1/forward?access_key=e9b29a2ef105b4df227694c90aeaae9c&query=${encodeURIComponent(
        address
    )}&limit=1`;
    request({ url: geocodingUrl, json: true }, (error, response) => {
        if (error) {
            callback('There is an unknown error!', undefined);
        } else if (response.body.error) {
            callback('Unable to find location!', undefined);
        } else {
            callback(undefined, response.body);
        }
    });
};

module.exports = geocode;
