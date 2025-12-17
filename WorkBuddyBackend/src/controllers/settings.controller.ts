import ApiError from "../errors/ApiError";
import { User } from "../models/User"
import type { Request, Response, NextFunction } from 'express';
import { sendSuccess } from "../responses/ApiResponse";

async function setHourlyRate (req: Request, res: Response, next: NextFunction) {
    const { _id } = req.user;
    const { hourlyRate } = req.body;

    try {
        /* Try to set the new hourly rate */
        
        //@ts-ignore
        const foundUser = await User.findOne({ _id });
        await foundUser?.addHourlyRate({ hourlyRate });
        return sendSuccess({ res, message: 'Hourly rate was set'})

    } catch (e) {
        console.log(e);
        throw new ApiError('Hourly rate was not set', 400, 'process');
    }
}

export default { 
    setHourlyRate
}