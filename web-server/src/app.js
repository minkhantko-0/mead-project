const path = require('path');
const express = require('express');
const app = express();
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const chalk = require('chalk');
const { response } = require('express');
const e = require('express');
const port = process.env.PORT || 3000;

app.set('view engine', 'hbs');

app.get('', (req, res) => {
    res.render('index', {
        title: 'Hello',
    });
});

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'Please provide a address!',
        });
    }
    geocode(req.query.address, (error, { data }) => {
        if (error) {
            return res.send({
                error: 'Unable to connect to network. Please check your internet connection.',
            });
        } else if (data.length === 0) {
            return res.send({
                error: 'Unable to find location.',
            });
        }
        const { latitude, longitude, name } = data[0];
        forecast(latitude, longitude, name, (error, response) => {
            if (error) {
                return res.send({
                    error: 'Unable to connect to the network!',
                });
            }
            res.send(response);
        });
    });
});

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term!',
        });
    }
    res.send({
        products: [req.query.search],
    });
});

app.get('*', (req, res) => {
    res.send({
        error: 'Page Not Found!',
        code: 404,
    });
});

app.listen(port, () => {
    console.log(chalk.greenBright.bold('Server is running on ' + port));
});
