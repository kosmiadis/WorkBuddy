
import { Model, model, Schema, Types } from "mongoose";
import { Entity } from "../types/Entity";
import { compare, genSalt, hash } from "bcrypt";
import { WorkSession } from "./WorkSession";
import { v4 as uuid } from "uuid";

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
    workSessions: Types.ObjectId[];
    hourlyRates: HourlyRateI[];
    selectedHourlyRate: number | null;
    selectedHourlyRateId: Types.ObjectId | undefined;
}

interface UserMethods {
    isValidPassword(password: string): Promise<boolean>;
    addHourlyRate({ hourlyRate }: { hourlyRate: number}): Promise<string>;
}

interface UserStaticMethods {
    checkInToWorkSession({ workSessionId }: { workSessionId: Types.ObjectId }): Promise<void>;
    checkOutFromWorkSession({ workSessionId }: { workSessionId: Types.ObjectId }): Promise<void>;
}

export interface UserModel extends Model<IUser, {}, UserMethods>, UserStaticMethods {}

const UserSchema = new Schema<IUser, UserModel, UserMethods>({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    workSessions: { type: [ Types.ObjectId ], required: false, default: []},
    hourlyRates: {
        type: [{
            _id: { type: String }, 
            hourlyRate: { type: Number},
            createdAt: { type: Date },
            updatedAt: { type: Date},
        }]
    },
    selectedHourlyRate: { type: Number, required: false, default: null },
    selectedHourlyRateId: { type: String, required: false, default: undefined },
}, {
    methods: {
        isValidPassword: async function isValidPassword (password: string) {
            const isValid = await compare(password, this.password)
            return isValid;
        },
        addHourlyRate: async function addHourlyRate ({ hourlyRate }) {
            const hourlyRateObj: HourlyRateI = {
                _id: uuid(),
                hourlyRate,
                createdAt: new Date(),
                updatedAt: new Date()
            }
            this.hourlyRates = [ ...this.hourlyRates, hourlyRateObj];
            this.selectedHourlyRate = hourlyRateObj.hourlyRate;
            
            //@ts-ignore
            this.selectedHourlyRateId = hourlyRateObj._id as ObjectId;
            await this.save();
            return hourlyRateObj._id;
        }
    },
    statics: {
        async checkInToWorkSession({ workSessionId }: { userId: Types.ObjectId, workSessionId: Types.ObjectId }) {
            await WorkSession.checkIn({ workSessionId });
        },
        async checkOutFromWorkSession({ workSessionId }: { workSessionId: Types.ObjectId }) {
            await WorkSession.checkOut({ workSessionId });

            const worksession = await WorkSession.findOne({ _id: workSessionId });
            await worksession!.calculateWorkHours();
        },
    },
    timestamps: true
},)

UserSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        const salt = await genSalt(10);
        this.password = await hash(this.password, salt);
    }
})

export const User = model<IUser, UserModel>('Users', UserSchema);