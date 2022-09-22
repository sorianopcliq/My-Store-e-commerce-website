// Error Handler Class
// we are useing the inheritance in this ErrorHandler is child class and Error is parent class
class ErrorHandler extends Error {

    // constructor have two perameter first is message , second is errorcode ya statsCode
    constructor(message, statusCode) {
        // every constructor have supper for representing parent class
        super(message);
        this.statusCode = statusCode

        // captureStackTrace() this function create stack property
        // we pass first 'this' for itself and second this.constructor for constructor
        Error.captureStackTrace(this, this.constructor)
    }
}

module.exports = ErrorHandler;