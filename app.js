'use strict'

var express = require('express');
var bodyParser = require('body-parser');

var app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

/*
    pendiente de definir las rutas del api
*/

app.get('/test', (req, res) => {
    res.status(200).send({
        message: 'Primer test'
    });
});

module.exports = app;