'use strict';
require('dotenv').config();

const express = require('express');
const cors = require('cors');

const PORT = process.env.PORT || 4000;
const app = express();

app.use(cors());

app.get('/', (request, response) => {
    response.status(200).send('The Home Page.');
});

console.log('PORT:', PORT);

// console.log('cors:',cors);
// console.log('app:',app);

app.get('/bad', (request, response) => {
    throw new Error('ERROR!');
});

////////////////////////////////Location///////////////////////////////////////////

function Location(city, geoData) {
    this.search_query = city;
    this.formatted_query = geoData[0].display_name;
    this.latitude = geoData[0].lat;
    this.longitude = geoData[0].lon;
}
app.get('/location', (request, response) => {
    try {
        const geoData = require('./data/geo.json');
        const city = request.query.city;
        const locationData = new Location(city, geoData);
        response.status(200).json(locationData);
        console.log(city);
    } catch (error) {
        errorHandler(error, request, response);
    }
});

function errorHandler(error, request, response) {
    response.status(500).send(error);
}



///////////////////////////////////////////Weather///////////////////////////////////////////

function Weather(forecast, darkskyData) {
    this.forecast = forecast;
    this.time = darkskyData.data[0].valid_date;
}
app.get('/weather', (request, response) => {
    try {
        const darkskyData = require('./data/darksky.json');
        const forecast = request.query.forecast;
        const weatherData = new Weather(forecast, darkskyData);
        response.status(200).json(weatherData);
        console.log(forecast);
    } catch (error) {
        errorHandler(error, request, response);
    }
});

///////////////////////////////////////////Not Gound/////////////////////////////////////////

    function notFound(request, response) {
        response.status(404).send('NOT FOUND!');
    }
app.use('*', notFound);

app.listen(PORT, () => console.log(`The server is up and running on ${PORT}`));
