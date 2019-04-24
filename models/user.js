'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = Schema({
    name: String,
    lastname: String,
    email: String,
    password: String,
    image: String,
    typeauthentication: String
});

module.exports = mongoose.model('User',userSchema);