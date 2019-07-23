const axios = require('axios');

const apiKey = '1e4581ba9d0b7df615df4d6a90fc0154';

const cooordenas = [
    {
        lat: -33.4727092,//Santiago (CL)
        lng: -70.7699148    
    },
    {
        lat: 47.4268437, //Zurich (CH)
        lng: 8.3912192    
    },
    {
        lat: -36.8629409,//Auckland (NZ)
        lng: 174.7253862    
    },
    {
        lat: -33.847927, //Sydney (AU)
        lng: 150.6517924
    },
    {        
        lat: 51.5285582, // Londres (UK)
        lng: -0.24168
    },
    {
        lat: 32.6581651, //Georgia (USA) 
        lng: -85.4215893
    }



]

const consultarClimas = () => {
    cooordenas.forEach( coordenada => {
        consultarCiudad(coordenada)
    })

}
const consultarCiudad = async (coordenada) => {
    
    const { lat, lng } = coordenada;

    const url = `https://api.darksky.net/forecast/${apiKey}/${lat},${lng}`;
    
    let resp = '';

    try {
        resp = await axios.get(url);
    } catch(error) {
        console.log( error);
    } 

    let { temperature, time }  = resp.data.currently;
    temperature = ((temperature -32)*5)/9;
    const { timezone } = resp.data;
    console.log('*******************************************');
    console.log( {temperature, time, timezone} );
    console.log('*******************************************');
    
}



consultarClimas();