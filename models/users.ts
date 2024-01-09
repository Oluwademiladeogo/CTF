import mongoose from 'mongoose';
export interface UserDoc extends Document {
    first_name: string;
    last_name: string;
    email: string;
    phone_num: string;
    birthday: Date;
    password: string;
    salt: string;
}
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
