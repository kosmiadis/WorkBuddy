import type { Request, Response, NextFunction } from 'express';
import { WorkSession } from '../models/WorkSession';
import { sendSuccess } from '../responses/ApiResponse';
import mongoose from 'mongoose';

async function getMonthlyGeneralReport (req: Request, res: Response, next: NextFunction) {
    const {  workSessions } = req.user;

    const worksessions = workSessions.map(id => new mongoose.Types.ObjectId(id)) || [];

    const currentMonth = new Date().getMonth();
    const generalReport = await WorkSession.aggregate([
        { 
            $match: {
                _id: { $in: worksessions },
                $expr: { $eq: [ { $month: "$scheduledCheckInDate"}, currentMonth+1]},
            }
        },
        {
            $group: {
                _id: null,
                totalScheduledWorkDays:{ $sum: { $cond: [{$eq: ["$hasCheckedIn", false]}, 1, 0]}},
                totalRealWorkDays: { $sum: { $cond: [{$eq: ["$hasCheckedOut", true]}, 1, 0]}},
                totalScheduledWorkHours: { $sum: "$scheduledWorkHours"},
                totalRealWorkHours: { $sum: "$realWorkHours" },
                totalMoneyEarned: { $sum: "$earnings"}
        }}
    ])

    let generalReportObj = null;

    if (generalReport) {

        const { totalScheduledWorkDays, totalRealWorkDays, totalScheduledWorkHours, totalRealWorkHours } = generalReport[0];

        generalReportObj = {
            totalScheduledWorkDays,
            totalRealWorkDays,
            totalScheduledWorkHours,
            totalRealWorkHours
        } 
    }   

    return sendSuccess({ res, data: generalReportObj, message: 'General monthly report loaded' });
}

async function getOverallAnalytics (req: Request, res: Response, next: NextFunction) {

    const { workSessions } = req.user;
    const worksessions = workSessions.map(id => new mongoose.Types.ObjectId(id)) || [];


    const overallAnalytics = await WorkSession.aggregate([
        {
            $match: {
                _id: { $in: worksessions },
            },
            
        },
        {
            $group: {
                _id: null,
                totalScheduledWorkDays: { $sum: 1 },
                totalRealWorkDays: { $sum: { $cond: [{$eq: ["$hasCheckedIn", true]},1, 0]}},
                totalRealWorkHours: { $sum: "$realWorkHours" },
                totalScheduledHours: { $sum: "$scheduledWorkHours"},
                totalMoneyEarned: { $sum: "$earnings"}
            }
        },
    ])    

    let overallAnalyticsObj = null;

    if (overallAnalytics) {

        const { totalScheduledWorkDays, totalRealWorkDays, totalScheduledWorkHours, totalRealWorkHours, totalMoneyEarned } = overallAnalytics[0];

        overallAnalyticsObj = {
            totalScheduledWorkDays,
            totalRealWorkDays,
            totalScheduledWorkHours,
            totalRealWorkHours,
            totalMoneyEarned
        } 
    }   

    return sendSuccess({ res, data: overallAnalyticsObj, message: 'Overall analytics Loaded' });
}

export default {
    getMonthlyGeneralReport,
    getOverallAnalytics
}