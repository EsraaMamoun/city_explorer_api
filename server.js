'use strict';
require('dotenv').config();

const express = require('express');
const cors = require('cors');

const PORT = process.env.PORT || 5500;
const app = express();

app.use(cors());

app.get('/', (request,response) => {
    response.status(200).send('The Home Page.');
});

console.log(PORT);

