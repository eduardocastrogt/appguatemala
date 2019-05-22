'use strict'

var Cultura = require('../models/cultura');
var constantes = require('../utils/constants').constants;


function addCultura(req, res){
    //Instancia para el modelo cultura
    var cultura = new Cultura();

    //Obteniendo parametros
    var params = req.body;

    //Comprobando que los datos no vengan en blanco
    if(params.title && params.department && params.description){

        //Asignando parametros
        cultura.title = params.title.toUpperCase();
        cultura.department = params.department;
        cultura.description = params.description;

        //Este campo es opcional
        if(params.image.length > 0){
            cultura.image = params.image
        }else{
            cultura.image = '-';
        }

        cultura.save((err, culturaStored) => {
            if(err){
                res.status(500).send({
                    message: constantes.GENERIC_NOT_REGISTER
                });
            }else{
                //Se comprueba que no se haya registrado la información
                if(!culturaStored){
                    res.status(404).send({
                        message: constantes.GENERIC_NOT_REGISTER
                    });
                }else{
                    //La información se guardo correctamente
                    res.status(200).send({
                        message: constantes.SAVE_INFORMATION
                    });
                }
            }
        });
    }else{
        //Parametros incorrectos
        res.status(200).send({
            message: constantes.WRONG_PARAMETERS
        });
    }
}

function getCulturaList(req, res){
    Cultura.find({}).exec((error, cultura) => {
        //Se comprueba el error
        if (error) {
            res.status(500).send({
                message: constantes.ERROR_REQUEST
            });
        } else {
            //Se comprueba que la lista no este vacia
            if (!cultura || cultura.length == 0) {
                res.status(404).send({
                    message: constantes.YOUTUBE_LIST_EMPY
                });
            } else {
                //Se regresan los elementos
                var valor1 = cultura.titla;
                var valor2 = cultura.id;
                res.status(200).send({
                    valor1,
                    valor2
                });
            }
        }
    });
}


//Exportación de las funciones

module.exports = {
    addCultura,
    getCulturaList
}