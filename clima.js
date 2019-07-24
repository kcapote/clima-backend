const coordenadas = [
    {
        lat: -33.4727092,//Santiago (CL)
        lng: -70.7699148    
    },
    // {
    //     lat: 47.4268437, //Zurich (CH)
    //     lng: 8.3912192    
    // },
    // {
    //     lat: -36.8629409,//Auckland (NZ)
    //     lng: 174.7253862    
    // },
    // {
    //     lat: -33.847927, //Sydney (AU)
    //     lng: 150.6517924
    // },
    {        
        lat: 51.5285582, // Londres (UK)
        lng: -0.24168
    },
    // {
    //     lat: 32.6581651, //Georgia (USA) 
    //     lng: -85.4215893
    // }

]

const apiKey = '1e4581ba9d0b7df615df4d6a90fc0154';


module.exports = consultarClimas = ({axios}) =>{
    
    consultarClimas = async () => {
        const climas = [];        
        for(let i =0 ; i < coordenadas.length; i++ ){
            let clima = await consultarCiudad(coordenadas[i]);
            climas.push(clima);
        }

        return climas;
    }
    
    consultarCiudad = async (coordenada) => {
        const timeNow = new Date().getDate();
        const { lat, lng } = coordenada;    
        const url = `${apiKey}/${lat},${lng}?lang=es&exclude=minutely,hourly,daily&units=si&time=timeNow`;        
        let resp = '';
    
        try {
            resp = await axios.get(url);
            //console.log(resp);
        } catch(error) {
            console.log( error);
        } 
    
        let { temperature, time, summary }  = resp.data.currently;
        const { timezone } = resp.data;
        let fecha = new Date().toLocaleString("en-US", {timeZone: timezone});
        fecha = new Date(fecha);
        const hora = '' + fecha.getHours();
        const minutos = '' + fecha.getMinutes();
        const horaFormateada = `${ hora.length < 2 ? '0' + hora : hora }:${ minutos.length < 2 ? '0' + minutos : minutos }` 
 
        return {temperature, timezone, horaFormateada, summary};

        
    }
    
    const cargarData = ({redis}) => {
        cooordenas.forEach(coordena => {

        });            
    } 

    return({
        consultarClimas
    })

};