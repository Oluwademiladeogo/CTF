import mongoose from 'mongoose';
import { UserDoc } from '../types';

export const User = mongoose.model<UserDoc>(
    'Users',
    new mongoose.Schema<UserDoc>(
        {
            first_name: {
                type: String,
                minlength: 2,
                maxlength: 255,
                required: true,
            },
            last_name: {
                type: String,
                minlength: 2,
                maxlength: 255,
                required: true,
            },
            email: {
                type: String,
                minlength: 2,
                maxlength: 255,
                required: true,
                unique: true,
            },
            phone_num: {
                type: String,
                minlength: 10,
                maxlength: 20,
                required: true,
                unique: true,
            },
            birthday: {
                type: Date,
                required: true,
            },
            password: {
                type: String,
                required: true,
                minlength: 8,
            },
            salt: {
                type: String,
                required: true,
            },
        },
        { timestamps: true },
    ),
);
