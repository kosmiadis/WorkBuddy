import type { Request, Response, NextFunction } from 'express';
import { User } from '../models/User';
import { loginSchema } from '../dataValidation/authValidation'
import { validateData } from '../dataValidation/validateData';
import ApiError from '../errors/ApiError';
import { sendCookie, sendSuccess } from '../responses/ApiResponse';
import { createToken } from '../util/auth/createToken';
import bcrypt from 'bcrypt';

async function me (req: Request, res: Response, next: NextFunction) {      
    return sendSuccess({ res, data: req.user , message: 'Auth successful' })
}

async function login (req: Request<{}, {}, { email: string, password: string }>, res: Response, next: NextFunction) {      
    const credentials = req.body;

    if (!credentials) throw new ApiError('Missing credentials', 401, 'auth', ['Credentials are missing']);

    const { isValid, errorMessages } = validateData(credentials, loginSchema);
    if (!isValid) throw new ApiError('Invalid Input', 401, 'auth', errorMessages);
     
    const foundUser = await User.findOne({ email: credentials.email })
    if (!foundUser) throw new ApiError('Unauthorized', 401, 'auth', ['Account does not exist'])

    const isValidPassword = await foundUser.isValidPassword(credentials.password);
    if (!isValidPassword) throw new ApiError('Invalid Credentials', 401, 'auth', ['Bad Credentials'])

    const _t = createToken({ id: foundUser._id, email: foundUser.email });
    return sendCookie({ res, data: foundUser._id, message: 'Login successful', cookieName: '_t', cookieValue: _t })
}

async function register (req: Request<{}, {}, { firstName: string, lastName: string, email: string, password: string }>, res: Response, next: NextFunction) {    
    const credentials = req.body;

    // if (!credentials) throw new ApiError('Missing credentials', 401, 'auth', ['Credentials are missing.']);

    // const { isValid, errorMessages } = validateData(credentials, loginSchema);
    // if (!isValid) throw new ApiError('Invalid Input', 401, 'auth', errorMessages);

    const existingUser = await User.findOne({ email: credentials.email });

    if (existingUser) throw new ApiError('Email was found in another account.', 401, 'auth', ['Account already exists'])

    console.log(credentials);
    const newUser = new User({ ...credentials });
    
    try {
        await newUser.save();
    }
    catch(e: any) {
        console.log(e.message);
    }
    if (!newUser) throw new ApiError('Resource creation failed', 400, 'process', ['Account was not created'])
    
    const _t = createToken({ id: newUser._id, email: newUser.email });
    return sendCookie({ res, data: {_id: newUser._id }, message: 'Account created successfuly', cookieName: '_t', cookieValue: _t })
}

async function logout (req: Request, res: Response, next: NextFunction) {      
    return res.clearCookie('_t').send({ message: 'logout successfull '})
}


async function resetPassword (req: Request, res: Response, next: NextFunction) {      
    const { currentPassword, newPassword } = req.body;
    const { _id } = req.user;

    const foundUser = await User.findOne({ _id });
    if (!foundUser) throw new ApiError('Something went wrong while resetting password', 400, 'process');
    
    const isValidPassword = await foundUser.isValidPassword(currentPassword);
    
    if (!isValidPassword) throw new ApiError('Wrong password', 400, 'auth');

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await User.updateOne({ _id }, {
        $set: {
            password: hashedPassword
        }
    })
    
    return sendSuccess({ res, data: {}, message: 'Password was reset' })
}

async function deleteAccount (req: Request, res: Response, next: NextFunction) {      
    const { _id } = req.user;
    
    await User.deleteOne({ _id });

    return sendSuccess({ res, data: {}, message: 'Account deleted successfuly', statusCode: 204 })
}

export default {
    login,
    register,
    me,
    logout,
    deleteAccount,
    resetPassword
}

