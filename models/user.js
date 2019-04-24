'use strict'

var mongoose = require('mongoose');
var schema =  mongoose.schema;

var userSchema = schema({
    name: String,
    lastname: String,
    email: String,
    password: String,
    image: String,
    typeauthentication: String
});

module.exports = mongoose.model('User',userSchema);