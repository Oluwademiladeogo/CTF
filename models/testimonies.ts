import mongoose from 'mongoose';
import { ITestimonyDoc } from '../types';
import { Schema } from 'mongoose';


const testimonySchema = new mongoose.Schema<ITestimonyDoc>({
    testifier: { 
        type: Schema.Types.ObjectId,
        ref: 'User', 
        required: true 
    },
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        maxLenght: 1000
    },
    attachments: { type: [String] },

}, { timestamps: true },
);

const Testimony = mongoose.model<ITestimonyDoc>('Testimony', testimonySchema);

export default Testimony;