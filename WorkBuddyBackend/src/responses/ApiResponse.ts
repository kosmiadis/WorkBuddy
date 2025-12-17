import type { Response } from 'express'
import type { ErrorStatusCode } from '../errors/ApiError';
import ApiError from '../errors/ApiError';

type SuccessStatusCode = 200 | 201 | 204

type ApiResponse<T> = {
    data?: T;
    message: string;
    statusCode: SuccessStatusCode | ErrorStatusCode;
    error?: string | ApiError;
}


type SendSuccessProps<T> = { 
    res: Response; 
    data?: T; 
    message: string; 
    statusCode?: SuccessStatusCode;  
}

export function sendSuccess<T> ({ res, data, message, statusCode=200 }: SendSuccessProps<T>): Response<Omit<ApiResponse<T>, 'error'>> {

    const response: Omit<ApiResponse<T>, 'error' | 'cookieName' | 'cookieValue'> = {
        data,
        message,
        statusCode,
    }
    
    return res.status(statusCode).json(response);
}

type SendErrorProps = { 
    res: Response;  
    message: string; 
    statusCode?: ErrorStatusCode  
    error: ApiError
}

export function sendError<T>({ res, message, error, statusCode=400 }: SendErrorProps): Response<Omit<ApiResponse<T>, 'data'>> {
    const response: Omit<ApiResponse<T>, 'data' | 'cookieName' | 'cookieValue'> = {
        message,
        statusCode,
        error
    }
    
    return res.status(statusCode).json(response);
}


type SendCookieProps<T> = {
    res: Response;
    message: string;
    data: T;
    statusCode?: SuccessStatusCode;
    cookieName: string;
    cookieValue: string;
}

export function sendCookie<T>({ res, data, message, cookieName, cookieValue, statusCode=201 }: SendCookieProps<T>): Response<Omit<ApiResponse<T>,'error'>> {
    const response: Omit<ApiResponse<T>, 'error'> = {
        data,
        message,
        statusCode,
    }
    
    return res.cookie(cookieName, cookieValue, {
        httpOnly: true,
        // secure: config.production
        sameSite: true,             
        maxAge: 1000 * 60 * 60 //1hr
    }).json(response)
}

type ClearCookieProps = {
    res: Response;
    message: string;
    statusCode: SuccessStatusCode;
    cookieName: string;
}

//204 --> successful deletion
export function clearCookie<T>({ res, message, cookieName, statusCode=204 }: ClearCookieProps): Response<Omit<ApiResponse<T>, 'data' | 'error'>> {
    const response: Omit<ApiResponse<T>, 'data' | 'error'> = {
        message,
        statusCode,
    }
    
    return res.status(statusCode).clearCookie(cookieName).json(response)
}




