'use strict'

//modulos necesarios
var bcrypt = require('bcrypt-nodejs');
//var jwt = require('../services/jwt');
var fs = require('fs');
var path = require('path');

var User = require('../models/user');
var constantes = require('../utils/constants').constants;

function register(req, res) {
    //Instancia de tipo Usuario
    var user = new User();
    //Obteniendo los parametros que vienen en el request
    var params = req.body;
    //Comprobando que los datos obligatorios no vengan en blanco
    if (params.name && params.lastname && params.email && params.password) {
        //Asignando los valores
        user.name = params.name.toUpperCase();
        user.lastname = params.lastname.toUpperCase();
        user.email = params.email.toLowerCase();
        user.image = null;
        user.typeauthentication = 'USUARIO_EMAIL'

        //Se busca dentro de la db por el email
        User.findOne({ email: user.email.toLowerCase() }, (err, issetUser) => {
            //Primero se valida el error en la petición
            if (err) {
                res.status(500).send({
                    message: constantes.ERROR_REQUEST
                });
            } else {
                //No existen resultados
                if (!issetUser) {
                    //Se encripta la contraseña del usuario
                    bcrypt.hash(params.password, null, null, (err, hash) => {
                        //Se almacena la contraseña encriptada
                        user.password = hash;

                        //Se almacena la información del usuario en la base de datos
                        user.save((err, userStored) => {
                            //Se comprueba el error
                            if (err) {
                                res.status(500).send({
                                    message: constantes.ERROR_IN_SAVE_USER
                                });
                            } else {
                                //Se comprueba que no se haya registrado
                                if (!userStored) {
                                    res.status(404).send({
                                        message: constantes.USER_NOT_REGISTER
                                    });
                                } else {
                                    //El usuario ha sido registrado
                                    res.status(200).send({
                                        message: constantes.USER_SUCCESS_STORED
                                            //message: 'USUARIO REGISTRADO'
                                    });
                                }
                            }
                        });
                    });
                } else {
                    //Si es verdadero, el usuario ya se encuentra registrado
                    res.status(200).send({
                        message: constantes.USER_EXISTS
                    });
                }
            }
        });
    } else {
        //Se devuelve el mensaje de error
        res.status(200).send({
            message: constantes.WRONG_PARAMETERS
        });
    }
}

//Función para obtener la lista de usuarios
function getUserList(req, res) {
    User.find({}).exec((error, user) => {
        //Se comprueba el error
        if (error) {
            res.status(500).send({
                message: constantes.ERROR_REQUEST
            });
        } else {
            //Se comprueba que la lista no este vacia
            if (!user || user.length == 0) {
                res.status(404).send({
                    message: constantes.YOUTUBE_LIST_EMPY
                });
            } else {
                //Se regresan los elementos
                res.status(200).send({
                    //total: `${youtube.length}`,
                    user
                });
            }
        }
    });
}

//Función para el inicio de sesión
function login(req, res){

    var params = req.body;

    var email = params.email;
    var password = params.password;

    User.findOne({email: email.toLowerCase()}, (err, issetUser)=>{
        //Se comprueba el error
        if(err){
            res.status(500).send({
                message: constantes.ERROR_REQUEST
            });
        }else{
            if (issetUser) {
                bcrypt.compare(password, issetUser.password, (err, check) => {
                    if (check) {
                        if (params.gettoken) {
                            res.status(200).send({
                                token: jwt.createToken(issetUser)
                            });
                        } else {
                            res.status(200).send({
                                //issetUser
                                message: 'true'
                            });
                        }
                    } else {
                        res.status(200).send({
                            message: 'false'
                        });
                    }
                })
            } else {
                res.status(404).send({
                    message: constantes.LOGIN_FAILED
                });
            }
        }
    });
}

function holaMundo(req, res){
    res.status(200).send({
        message: 'Presentación DevOps'
    });
}


module.exports = {
    register,
    getUserList,
    login,
    holaMundo
}