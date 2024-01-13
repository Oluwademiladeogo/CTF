import { Types } from 'mongoose';
import { Request } from "express"

export type JwtPayload = { 
    id: unknown
    name: string
    phone: string
}

export interface OtpDoc extends Document {
    email: string;
    otp: string;
    createdAt: Date;
}

export interface UserDoc extends Document {
    first_name: string;
    last_name: string;
    email: string;
    phone_num: string;
    birthday: Date;
    password: string;
    salt: string;
    role: string;
}

export interface TestimonyDoc extends Document {
    title: string
    content: string
    testifier: Types.ObjectId | UserDoc
    attachments?: string[]
}

export interface PrayerDoc extends Document {
    title: string
    url: string
    startDate: Date
    endDate: Date
    frequency: {
        value: number;
        unit: 'minutes' | 'hours' | 'days';
    };
}

export interface CategoryDoc extends Document {
    name: string;
    imageUrl: string
}
  
export interface PostDoc extends Document {
    title: string;
    content: string;
    author: Types.ObjectId | UserDoc;
    categories: Types.ObjectId[] | CategoryDoc[];
}

export interface PartnerDoc extends Document {
    joinedAt: Date;
    user: Types.ObjectId | UserDoc;
}

export interface MentorDoc extends Document {
    name: string;
    specialty: string;
    user: Types.ObjectId | UserDoc;
    joinedAt: Date;
    mentees: Types.ObjectId[] | UserDoc[];
}

export interface ICustomRequest extends Request {
    user?: JwtPayload
}