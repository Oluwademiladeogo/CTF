import mongoose from 'mongoose';
import { OtpDoc } from '../types.js';


export const otp = mongoose.model<OtpDoc>(
    'otp',

    new mongoose.Schema<OtpDoc>({
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
