const CustomError = require('./errors/custom-error');
const handlerError = require('./errors/handler-error');

const coordenadas = [
    {
        city: 'Santiago',
        lat: -33.4727092,//Santiago (CL)
        lng: -70.7699148    
    },
    {
        city: 'Zurich',
        lat: 47.4268437, //Zurich (CH)
        lng: 8.3912192    
    },
    {
        city: 'Auckland',
        lat: -36.8629409,//Auckland (NZ)
        lng: 174.7253862    
    },
    {
        city: 'Sydney',
        lat: -33.847927, //Sydney (AU)
        lng: 150.6517924
    },
    {
        city: 'Londres',        
        lat: 51.5285582, // Londres (UK)
        lng: -0.24168
    },
    {
        city: 'Georgia',
        lat: 32.6581651, //Georgia (USA) 
        lng: -85.4215893
    }

]

const apiKey = '1e4581ba9d0b7df615df4d6a90fc0154';

let climas = [];  
       
module.exports = consultarClimas = ({axios, redis}) =>{
    
    consultarClimas = async (callback) => {
        climas= [];  
        redis.hgetall('coords', async (err, result) => {
            let longitud = Object.keys(result).length/3;
            for (let i = 0; i < longitud; i++) {
                 const lat = result[`lat${i}`];  
                 const lng = result[`lng${i}`];
                 const city = result[`city${i}`];
                 let code = 0; 
                 let clima;
                 let cont =0;   
                 do{
                     cont = cont +1;
                     clima = await consultarCiudad({lat, lng, city});
                     ({code} = clima);
                 }while(code!=0)

                 climas.push({...clima, lat, lng });  
            }
            callback(climas);

        });       

    }
    
    consultarCiudad = async (coordenada) => {

        const { lat, lng } = coordenada;    
        const url = `${apiKey}/${lat},${lng}?lang=es&exclude=minutely,hourly,daily&units=si`;        
        let resp = '';
    
        try {
            if (Math.random(0, 1) < 0.1) throw new CustomError(16,'How unfortunate! The API Request Failed', coordenada); 
            resp = await axios.get(url);
            let { temperature, time, summary }  = resp.data.currently;
            const { timezone } = resp.data;
            let fecha = new Date().toLocaleString("en-US", {timeZone: timezone});
            fecha = new Date(fecha);
            const hora = '' + fecha.getHours();
            const minutos = '' + fecha.getMinutes();
            const horaFormateada = `${ hora.length < 2 ? '0' + hora : hora }:${ minutos.length < 2 ? '0' + minutos : minutos }` 
            const code = 0;
            return { temperature, timezone, horaFormateada, summary, code };        
        } catch(err) {            
            return handlerError({redis}).capturarError(err);
        } 
            
        
    }
    
    const cargarData = () => {
        for(let i= 0; i< coordenadas.length; i++){
            redis.hmset('coords', {
                [`lat${i}`]: coordenadas[i].lat,
                [`lng${i}`]: coordenadas[i].lng,
                [`city${i}`]: coordenadas[i].city,
                }        
            );
        } 
    } 

    return({
        consultarClimas,
        cargarData
    })

};