'use strict'

var mongoose = require('mongoose');
var schema = mongoose.schema;

var paisSchema = schema({
    name: String,
    description: String,
    cantidaddeptos: int,
    departamentos: {
        namedepto: String,
        descriptiondepto: String,
        municipios: {
            namemunicipio: String,
            descriptionmunicipio: String
        }
    }
});