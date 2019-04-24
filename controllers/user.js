'use strict'

//modulos necesarios
var bcrypt = require('bcrypt-nodejs');
//var jwt = require('../services/jwt');
var fs = require('fs');
var path = require('path');

var User = require('../models/user');
var constantes = require('../utils/constants').constants;

function register(req, res){
    //Instancia de tipo Usuario
    var user = new User();
    //Obteniendo los parametros que vienen en el request
    var params = req.body;
    //Comprobando que los datos obligatorios no vengan en blanco
    if(params.name &&  params.lastname && params.email && params.password){
        //Asignando los valores
        user.name = params.name;
        user.lastname = params.lastname;
        user.email = params.email.toLowerCase();
        user.image = null;
        user.typeauthentication = 'USUARIO_EMAIL'

        //Se busca dentro de la db por el email
        User.findOne({email: user.email.toLowerCase()}, (err, issetUser) => {
            //Primero se valida el error en la petición
            if(err){
                res.status(500).send({
                    message: constantes.ERROR_REQUEST
                });
            }else{
                //No existen resultados
                if(!issetUser){
                    //Se encripta la contraseña del usuario
                    bcrypt.hash(params.password,null, null, (err,hash)=>{
                        //Se almacena la contraseña encriptada
                        user.password = hash;

                        //Se almacena la información del usuario en la base de datos
                        user.save((err,userStored)=>{
                            //Se comprueba el error
                            if(err){
                                res.status(500).send({
                                    message: constantes.ERROR_IN_SAVE_USER
                                });
                            }else{
                                //Se comprueba que no se haya registrado
                                if(!userStored){
                                    res.status(404).send({
                                        message: constantes.USER_NOT_REGISTER
                                    });
                                }else{
                                    //El usuario ha sido registrado
                                    res.status(200).send({
                                        message: constantes.USER_SUCCESS_STORED
                                        //message: 'USUARIO REGISTRADO'
                                    });
                                }
                            }
                        });
                    });
                }else{
                    //Si es verdadero, el usuario ya se encuentra registrado
                    res.status(200).send({
                        message: constantes.USER_EXISTS
                    });
                }
            }
        });
    }else{
        //Se devuelve el mensaje de error
        res.status(200).send({
            message: constantes.WRONG_PARAMETERS
        });
    }
}


module.exports = {
    register
}