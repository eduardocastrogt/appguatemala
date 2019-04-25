'use strict'

var fs = require('fs');
var mongoose = require('mongoose');

var constants = require('../utils/constants').constants;
var Youtube = require('../models/youtube');


//Función para obtener la lista de videos de youtube
function getYoutubeList(req, res) {
    var db = mongoose.connection;
    var coleccion = db.collection('youtube');
    coleccion.find({}).toArray((error,youtube)=>{
        //Se comprueba el error
        if(error){
            res.status(500).send({
                message: constants.ERROR_REQUEST
            });
        }else{
            //Se comprueba que la lista no este vacia
            if(!youtube || youtube.length == 0){
                res.status(404).send({
                    message: constants.YOUTUBE_LIST_EMPY
                });
            }else{
                //Se devuelve la lista de youtube
                res.status(200).send({
                    youtube
                });
            }
        }
    });
    db.close();
}

module.exports = {
    getYoutubeList
}