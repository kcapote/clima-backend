class CustomError extends Error {

    constructor(code, error, coordsError) {
        super(error);
        this.code = code;
        this.error = error;
        this.coordsError = coordsError; 
    }

}
module.exports = CustomError;