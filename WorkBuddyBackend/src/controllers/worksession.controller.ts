import { Request, Response, NextFunction } from "express"
import ApiError from "../errors/ApiError";
import { WorkSession } from "../models/WorkSession";
import { sendSuccess } from "../responses/ApiResponse";
import { validateData } from "../dataValidation/validateData";
import { User } from "../models/User";
import { createWorkSessionSchema, workSessionSchema } from "../dataValidation/workSession";
import { isSameDate } from "../util/time/isSameDate";

async function getWorkSessions (req: Request<{}, {}, {}, { limit: number }>, res: Response, next: NextFunction) {
    const { limit } = req.query;
    const { workSessions } = req.user;

    /*  Fetch worksessions if workSessions list is not emtpy. If list is empty return [] */
    const foundWorkSessions = workSessions.length > 0 ? await WorkSession.find({ _id: { $in: workSessions }}).sort({ createdAt: -1 }).limit(limit || 0) : [];
    return sendSuccess({ res, data: foundWorkSessions, message: 'Work sessions loaded' })
}

async function createWorkSession (req: Request<{}, {}, { scheduledCheckInDate: Date, scheduledCheckOutDate: Date }>, res: Response, next: NextFunction) {
    const { scheduledCheckInDate, scheduledCheckOutDate } = req.body;
    const { _id, selectedHourlyRate, workSessions } = req.user;

    if (!selectedHourlyRate) throw new ApiError('Cannot create worksession without having an hourly rate. Add an hourly rate via settings.', 400, 'validation');

    /* Checking if work session already exists */
    try {
        (await WorkSession.find({ _id: { $in: workSessions }})).forEach(workSession => {
            //@ts-ignore
            const workSessionDate = new Date(workSession.scheduledCheckInDate);
            const bodyWorkSessionDate = new Date(scheduledCheckInDate);

            /* Makes sure that new work session has unique date */
            if (isSameDate(workSessionDate, bodyWorkSessionDate)) {
                console.log('it run here');
                throw new Error();
            }
        })
    } catch (e) {
        throw new ApiError('Work session already exists', 400, 'validation');
    }

    /* Try creating work session */
    try {
        const workSession = await new WorkSession({ scheduledCheckInDate, scheduledCheckOutDate, earningsRate: selectedHourlyRate }).save();
        
        /* Update user's worksessions array with the new worksession _id */
        await User.updateOne({ _id }, {
        $push: {
            workSessions: workSession._id
            }
        })
        return sendSuccess({ res, data: workSession._id, message: 'Work session created successfuly'})  
    }
    catch (e) {
        throw new ApiError('Work Session was not created', 400, 'process');
    }

}

async function editWorkSession (req: Request, res: Response, next: NextFunction) {
    const { id } = req.query;    
    
    try { 
        /* Attempt to update Work Session */
        await WorkSession.findOneAndUpdate({ _id: id }, {
            $set: { ...req.body }
        })
    } catch (e) {
        throw new ApiError('Work Session was not updated', 400, 'process');
    }

    await (await WorkSession.findOne({ _id: id}))?.save();
    
    return sendSuccess({ res, message: 'Work session updated successfuly' });
}

async function deleteWorkSession (req: Request, res: Response, next: NextFunction) {
    const { id: workSessionId } = req.query;
    const { _id } = req.user;

    if (!workSessionId) throw new ApiError('Work session id is missing', 400, 'validation', ['Missing id query'])

    try {
        const workSessionDeletion = await WorkSession.findOneAndDelete({ _id: workSessionId });
    
        /* Remove WorkSession's id from user's work sessions list. */
        await User.updateOne({ _id }, {
            $pull: {
                workSessions: workSessionDeletion!._id
            }
        })

        return sendSuccess({ res, data: workSessionDeletion?.$isDeleted, message: 'Work session deleted successfuly', })
    } catch (e) {
        throw new ApiError('Work Session was not deleted', 400, 'process');
    }
}

async function checkInWorkSession (req: Request, res: Response, next: NextFunction) {
    const { id: workSessionId } = req.query;

    if (!workSessionId) throw new ApiError('Work session id is missing', 400, 'validation');

    //@ts-ignore
    await User.checkInToWorkSession({ workSessionId });

    return sendSuccess({ res, message: 'Checked in' })
}

async function checkOutWorkSession (req: Request, res: Response, next: NextFunction) {
    const { id: workSessionId } = req.query;

    if (!workSessionId) throw new ApiError('Work session id is missing', 400, 'validation');

    //@ts-ignore
    await User.checkOutFromWorkSession({ workSessionId });

    return sendSuccess({ res, message: 'Checked out' })
}

async function getNextWorkSession (req: Request, res: Response, next: NextFunction) {
    const { workSessions } = req.user;

    const worksessions = await WorkSession.find({ _id: { $in: workSessions }});

    /* Finds the next work session */
    const nextWorkSession = worksessions.sort((a, b) => new Date(a.scheduledCheckInDate).getTime() - new Date(b.scheduledCheckInDate).getTime()).find((worksession) => {
        
        /* Returns the first document that matches the following criteria */
        return !worksession.hasCheckedIn || !worksession.hasCheckedOut
    })
    
    return sendSuccess({ res, message: 'successfuly found next work session', data: { nextWorkSession: nextWorkSession || null }})
}

export default {
    getWorkSessions,
    createWorkSession,
    editWorkSession,
    deleteWorkSession,
    checkInWorkSession,
    checkOutWorkSession,
    getNextWorkSession
}