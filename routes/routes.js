const express = require('express');
const router = express.Router();
const clima = require('../clima');
const handlerError = require('../errors/handler-error');

module.exports = (services) => {
    
    router.get('/climas',(req,res)=>{
       clima(services).consultarClimas(climas => {
            return( 
                res.json({
                    climas: climas
                })
            );

       });
    });

    router.get('/erroresLogs',(req,res) => {
        
        const logs = handlerError(services).listadoErrores(logs =>{
            return res.json({
                logs
            });
        });

    });

    return router;
}