const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const address = process.argv[2];

geocode(address, (error, { data }) => {
    if (error) {
        console.log(error);
    } else if (data.length === 0) {
        console.log('Unable to find location');
    } else {
        const { latitude, longitude, name } = data[0];
        forecast(latitude, longitude, name, (error, response) => {
            if (error) {
                console.log(error);
            } else {
                console.log(response);
            }
        });
    }
});
