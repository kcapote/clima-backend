//librerias para el servidor
const express = require('express');
const http = require('http');

//api de clima
const clima = require('./clima');
const services = require('./services');

//configuracion del servidor
const app = express();
const socketIO = require('socket.io');
let server = http.createServer(app);

const puerto = 3001;

let io = socketIO(server);

app.get('/redis', (req, resp) =>{
    const {redis} = services;
    redis.hset("coord", "field1", "Hello");
    redis.hset("coord", "field2", "Hello1");
    redis.hset("coord", "field3", "Hello2");

    redis.hgetall('coord',(err,reply)=>{
        if (err) {
            return resp.json({
                err
            });
        }
        resp.json({
            resp: reply
        });

    }); 

    // redis.lpush('coordenadas','field1','Hello');
    // redis.lpush('coordenadas','field2','Hello1');
    // redis.lpush('coordenadas','field3','Hello2');

    // redis.lrange('coordenadas',0,100,(err, reply) => {
    //     return resp.json({
    //         consulta: reply
    //     })
    // });   
    
});


app.get('/clima',(req,res)=>{
   clima(services).consultarClimas().then(
        climas => {
            return( 
                res.json({
                    climas: climas
                })
             )
        }
    )
    
    // .cath( err => {
    //     return(
    //         res.json({
    //             err
    //         })
    //     )
    // });   

})


server.listen(puerto, (error)=>{
    if (error) throw new Error(error);
    console.log(`servidor corriendo en el puerto ${puerto}`);
});

//clima(services).consultarClimas();