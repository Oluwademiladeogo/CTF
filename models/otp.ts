import mongoose from 'mongoose';
import { IOtpDoc } from '../types';


export const otp = mongoose.model<IOtpDoc>(
    'otp',

    new mongoose.Schema<IOtpDoc>({
        email: {
            type: String,
            required: true,
        },
        otp: {
            type: String,
            required: true,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            expires: 60 * 5,
        },
    }),
);
