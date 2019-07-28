const express = require('express');
const router = express.Router();
const clima = require('../clima');
const handlerError = require('../errors/handler-error');
const path = require('path');

module.exports = (services) => {
    
    //servicio que retorna los climas de las ciudades
    router.get('/climas',(req,res)=>{
       clima(services).consultarClimas(climas => {
            return( 
                res.json({
                    climas: climas
                })
            );

       });
    });

    //servicio que retorna los logs
    router.get('/erroresLogs',(req,res) => {
        
        const logs = handlerError(services).listadoErrores(logs =>{
            return res.json({
                logs
            });
        });

    });
    

    return router;
}