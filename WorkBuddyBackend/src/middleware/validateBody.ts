import type { Request, Response, NextFunction } from 'express';
import z, { ZodObject } from 'zod';
import { getZodErrorMessages } from '../util/data-validation/getZodErrorMessages';
import { ZodIssue } from 'zod/v3';
import ApiError from '../errors/ApiError';

export const validateBody = (validationSchema: ZodObject) => (req: Request, res: Response, next: NextFunction) => {
    const body = req.body;

    const isValid = validationSchema.safeParse(body);
    if (!isValid.success) {
        console.log('it run');
        const errorMessages = getZodErrorMessages(isValid.error.issues as ZodIssue[]);
        throw new ApiError('Body Validation Failed', 400, 'validation', errorMessages);
    }
    next();
}