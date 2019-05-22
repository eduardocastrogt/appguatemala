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

//Exportación de las funciones

module.exports = {
    addCultura
}