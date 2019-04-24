'use strict'

var express = require('express');
var userController = require('../controllers/user');

var api = express.Router();

//Rutas de acceso
api.post('/register',userController.register);

module.exports = api;