import type { Request, Response, NextFunction } from 'express';
import { sendError, sendSuccess } from '../responses/ApiResponse';
import ApiError from './ApiError';

export function ErrorHandler (err: ApiError, req: Request, res: Response, next: NextFunction) {
    console.log(err);
    if (err.errorType === 'validation' || err.errorType === 'auth') {
        return sendError({ res, message: err.message, error: err, statusCode: 400 })
    }

    if (err.errorType === 'internal' || err.errorType === 'process') {
        return sendError({ res, message: 'Something went wrong', error: err, statusCode: 400 })
    }

    return sendError({ res, message: 'An unexpected error occured', error: err })
}