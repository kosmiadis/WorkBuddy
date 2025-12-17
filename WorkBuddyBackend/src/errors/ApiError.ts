export type ErrorStatusCode = 301 | 400 | 401 | 404 | 500
type ErrorType = 'validation' | 'auth' | 'internal' | 'process'

class ApiError extends Error {
    statusCode: ErrorStatusCode;
    errorMessages?: string[];
    errorType: ErrorType;

    constructor(message: string, statusCode: ErrorStatusCode, errorType: ErrorType, errorMessages?: string[]){
        super(message);
        this.statusCode = statusCode;
        this.errorType = errorType;
        this.errorMessages = errorMessages;
        Error.captureStackTrace(this, this.constructor);
    }
}

export default ApiError;