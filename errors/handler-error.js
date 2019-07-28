const CustomError = require('./custom-error');

const opcionesFecha = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour:'numeric', minute:'numeric', second:'numeric' };


module.exports = handlerError = ({redis}) => {

    const capturarError = (err) => {
        let code, error;
        if (err instanceof CustomError) {
            ({code, error } = err);
            guardarError(err);
        } else {
            ({ code, error } = err.response.data);
        }
        return { 
            code,
            error
        }

    }
    
    const guardarError = (err) => {
        const date = new Date();
        const time = date.getTime();
        redis.hmset('api.errors', { 
            [time]: `Error consultando las coordenas de la ciudad ${err.coordsError.city}, ${date.toLocaleDateString('es-UE', opcionesFecha) }`
        }, () => {console.log('Guardado en el log')}  );
    }

    const listadoErrores = (callback) => {        
        redis.hgetall('api.errors', (err, result) => {
            if(err) return err;
            callback( 
                Object.keys(result).map( log =>
                    ({ [log]: result[log] })
                )              
            );
           
        });
    }
    
    return ({
        capturarError,
        listadoErrores
    });


}