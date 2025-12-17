import type { Entity } from "./Entity";

// export type WorkSessionI = {
//     scheduledCheckInDate: Date;
//     scheduledCheckOutDate: Date;    
//     hasCheckedIn: boolean;
//     hasCheckedOut: boolean;
//     checkInDate?: Date;
//     checkOutDate?: Date;

// } & Entity;


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