'user strict'

var express = require('express');
var culturaController = require('../controllers/cultura');

var api = express.Router();

//Rutas de acceso
api.post('/addcultura', culturaController.addCultura);

//Exportando el modulo
module.exports = api;