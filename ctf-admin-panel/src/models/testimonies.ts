import mongoose from 'mongoose';
import { TestimonyDoc } from '../types.js';
import { Schema } from 'mongoose';


const testimonySchema = new mongoose.Schema<TestimonyDoc>({
    user: { 
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

const TestimonyModel = mongoose.model<TestimonyDoc>('Testimony', testimonySchema);

export default TestimonyModel;