'use strict'

var express = require('express');
var youtubeController = require('../controllers/youtube');

var api = express.Router();

//Rutas de acceso
api.get('/listyoutubevideo', youtubeController.getYoutubeList);

module.exports = api;