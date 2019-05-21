'use strict'

var express = require('express');
var bodyParser = require('body-parser');

var app = express();

//Variables de las rutas
var userRouter = require('./routes/user');
var youtubeRouter = require('./routes/youtube');
var culturaRouter = require('./routes/cultura');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Configurar cabeceras y cors
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

/*
app.get('/test', (req, res) => {
    res.status(200).send({
        message: 'Primer test'
    });
});
*/


app.use('/user', userRouter);
app.use('/youtube', youtubeRouter);
app.use('/cultura',culturaRouter);

module.exports = app;