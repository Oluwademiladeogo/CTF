import { config } from 'dotenv';
import mongoose from 'mongoose';
config();

const uri: string = process.env.MONGODB_URI || '';

export const connectDB = async () => {
    mongoose
        .connect(uri)
        .then(() => {
            if (process.env.NODE_ENV === 'development') {
                console.log('Connected to db');
                mongoose.set('debug', true);
            }
        })
        .catch((error) => {
            console.log("Could not connect to mongo DB");
            console.log(error);
        });

};
