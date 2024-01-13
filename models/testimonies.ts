import mongoose from 'mongoose';
import { TestimonyDoc } from '../types';
import { Schema } from 'mongoose';


const testimonySchema = new mongoose.Schema<TestimonyDoc>({
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

const Testimony = mongoose.model<TestimonyDoc>('Testimony', testimonySchema);

export default Testimony;