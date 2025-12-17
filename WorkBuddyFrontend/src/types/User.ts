import type { Entity } from "./Entity";

interface HourlyRateI {
    _id: string;
    hourlyRate: number;
    createdAt: Date;
    updatedAt: Date;
}

export interface IUser extends Entity {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    workSessions: string[];
    hourlyRates: HourlyRateI[];
    selectedHourlyRate: number | null;
    selectedHourlyRateId: string | undefined;
}