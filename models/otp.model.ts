import mongoose from 'mongoose';

export interface OtpDoc extends Document {
    email: string;
    otp: string;
    createdAt: Date;
}
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
