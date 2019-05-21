'use strict'

var mongoose = require('mongoose');
var schema = moongoose.Schema;

var culturaSchema = Schena({
    title: String,
    department: String,
    description: String
});

module.exports = mongoose.model('Cultura',culturaSchema);