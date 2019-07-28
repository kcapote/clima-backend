//librerias para el servidor
const express = require('express');
const http = require('http');
const cors = require('cors');

//api de clima
const clima = require('./clima');
const services = require('./services');

//configuracion del servidor
const app = express();
const socketIO = require('socket.io');
let server = http.createServer(app);
let io = socketIO(server);

//routas para el mapa
const router = require('./routes/routes');
//puerto del servidor
const puerto = 3001;

app.use(cors());
app.use('/',router(services));

//Configuracion del socket que enviara la data al front
io.on('connection', socket => {
    console.log('usuario conectado');
    socket.on('disconnect',()=>{
        console.log('usuario desconectado');
    });
    
    socket.on('cargarClimas',  (mensaje, callback) => {        
        console.log('cargando climas');
        clima(services).consultarClimas(climas=>{
            callback(climas);
            console.log('resultado de carga ', climas);
        });
    });
    
});

server.listen(puerto, (error)=>{
    if (error) throw new Error(error);
    clima(services).cargarData();
    console.log(`servidor corriendo en el puerto ${puerto}`);
});

