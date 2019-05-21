'use strict'

var mongoose = require('mongoose');
var schema = moongoose.Schema;

var tradicionesSchema = Schena({
    title: String,
    department: String,
    description: String
});

module.exports = mongoose.model('Tradiciones',tradicionesSchema);