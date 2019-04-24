'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var youtubeSchema = Schema({
    title: String,
    description: String,
    url: String,
});

module.exports = mongoose.model('User',youtubeSchema);