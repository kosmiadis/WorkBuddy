import type { Request, Response, NextFunction } from "express";
import ApiError from "../errors/ApiError";
import { validateToken } from '../util/auth/validateToken';
import { decodeToken } from '../util/auth/decodeToken';
import { User } from "../models/User";

export async function checkAuth (req: Request, res: Response, next: NextFunction) {
    const token = req.cookies._t;

    if (!token) throw new ApiError('Auth token missing', 401, 'auth');

    const isValid = validateToken({token});
    if (!isValid) throw new ApiError('Unauthorized', 401, 'auth');
    const { _id } = decodeToken(token) as { _id: string }

    const authUser = await User.findOne({ _id });

    if (authUser) req.user = authUser;
    else throw new ApiError('Something went wrong while authenticating', 301, 'auth');

    next();
}

