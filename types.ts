import { Types } from 'mongoose';
import { Request } from "express"

export type JwtPayload = { 
    id: unknown
    name: string
    phone: string
}

export interface IOtpDoc extends Document {
    email: string;
    otp: string;
    createdAt: Date;
}

export interface IUserDoc extends Document {
    first_name: string;
    last_name: string;
    email: string;
    phone_num: string;
    birthday: Date;
    password: string;
    salt: string;
    role: string;
}

export interface ITestimonyDoc extends Document {
    title: string
    content: string
    testifier: Types.ObjectId | IUserDoc
    attachments?: string[]
}

export interface IPrayerDoc extends Document {
    title: string
    url: string
    startDate: Date
    endDate: Date
    frequency: {
        value: number;
        unit: 'minutes' | 'hours' | 'days';
    };
}

export interface ICategoryDoc extends Document {
    name: string;
    imageUrl: string
}
  
export interface IPostDoc extends Document {
    title: string;
    content: string;
    author: Types.ObjectId | IUserDoc;
    categories: Types.ObjectId[] | ICategoryDoc[];
}

export interface IPartnerDoc extends Document {
    joinedAt: Date;
    user: Types.ObjectId | IUserDoc;
}

export interface IMentorDoc extends Document {
    name: string;
    specialty: string;
    user: Types.ObjectId | IUserDoc;
    joinedAt: Date;
    mentees: Types.ObjectId[] | IUserDoc[];
}

export interface ICustomRequest extends Request {
    user?: JwtPayload
}