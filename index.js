'use strict'

var mongoose = require('mongoose');
var port = process.env.PORT || 3000;
var app = require('./app');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://appguate_:Inicio123@ds145786.mlab.com:45786/appguatemala',{useNewUrlParser:true});

app.listen(port);

console.log('Servidor en ejecución');