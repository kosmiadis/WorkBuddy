import { Model, model, Schema, startSession, Types } from "mongoose";
import { Entity } from "../types/Entity";
import ApiError from "../errors/ApiError";
import { isDateBefore } from "../util/time/isBefore";

export interface WorkSessionI extends Entity {
    scheduledCheckInDate: Date;
    scheduledCheckOutDate: Date;
    hasCheckedIn: boolean;
    hasCheckedOut: boolean;
    scheduledWorkHours: number;
    realWorkHours: number;
    
    earningsRate: number;
    earnings: number;
    
    checkInDate?: Date;
    checkOutDate?: Date;
}

interface IWorkSessionMethods {
    calculateWorkHours(): Promise<void>,
}

interface WorkSessionStaticsI {
    checkIn({ workSessionId }: { workSessionId: Types.ObjectId }): Promise<void>
    checkOut({ workSessionId }: { workSessionId: Types.ObjectId }): Promise<void>
}

export interface WorkSessionModel extends Model<WorkSessionI, {}, IWorkSessionMethods>, WorkSessionStaticsI {}


const WorkSessionSchema = new Schema<WorkSessionI, WorkSessionModel, IWorkSessionMethods>({
    scheduledCheckInDate: { type: Date, getTimezoneOffset: true, required: true },
    scheduledCheckOutDate: { type: Date, required: true },
    scheduledWorkHours: { type: Number, required: false},
    realWorkHours: { type: Number, required: false},
    hasCheckedIn: { type: Boolean, default: false},
    hasCheckedOut: { type: Boolean, default: false},
    checkInDate: { type: Date },
    checkOutDate: { type: Date },
    earnings: { type: Number, default: 0},
    earningsRate: { type: Number, required: true }
}, {
    methods: {
        calculateWorkHours: async function calculateWorkHours(): Promise<void> {
            const totalHours = Math.abs(new Date(this.scheduledCheckInDate).getTime() - new Date(this.scheduledCheckOutDate).getTime()) / ( 60 * 60 * 1000);            
            this.scheduledWorkHours = parseFloat(totalHours.toFixed(2));

            //if user has finished work session calculate real work hours.
            if (this.hasCheckedIn && this.hasCheckedOut) {
                const totalRealHours = Math.abs(new Date(this.checkInDate!).getTime() - new Date(this.checkOutDate!).getTime()) / ( 60 * 60 * 1000);            
                this.realWorkHours = parseFloat(totalRealHours.toFixed(2));
                this.earnings = parseFloat((this.earningsRate * this.realWorkHours).toFixed(2));
            }
        }
    },
    statics: {
        async checkIn ({ workSessionId}: { workSessionId: Types.ObjectId }) {
            await this.updateOne({ _id: workSessionId }, {
                $set: {
                    checkInDate: new Date(),
                    hasCheckedIn: true
                }
            })
        },
        async checkOut ({ workSessionId}: { workSessionId: Types.ObjectId }) {
            await this.findOneAndUpdate({ _id: workSessionId }, {
                $set: {
                    checkOutDate: new Date(),
                    hasCheckedOut: true
                }
            })
        },
    },
    timestamps: true
})

WorkSessionSchema.pre('save', async function (next) {
    //if scheduled date is before the current time auto check in check out the work session and set as 
    //check in /out default values the values of scheduled check in / out.
    if (isDateBefore(this.scheduledCheckInDate, new Date()) && !this.checkInDate) {
        this.hasCheckedIn = true;
        this.checkInDate = this.scheduledCheckInDate;
        this.hasCheckedOut = true;
        this.checkOutDate = this.scheduledCheckOutDate;
    }
    await this.calculateWorkHours();
    next();
})

export const WorkSession = model<WorkSessionI, WorkSessionModel>('WorkSession', WorkSessionSchema);
