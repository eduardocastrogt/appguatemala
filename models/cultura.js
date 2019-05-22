'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var culturaSchema = Schema({
    title: String,
    department: String,
    description: String,
    image: String
});

module.exports = mongoose.model('Cultura',culturaSchema);