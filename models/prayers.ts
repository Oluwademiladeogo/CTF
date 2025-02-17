import mongoose from 'mongoose';
import { IPrayerDoc } from '../types';


const prayerSchema = new mongoose.Schema<IPrayerDoc>({
    title: {
        type: String,
        required: true,
    },
    url: {
        type: String,
        required: true
    },
    startDate: { 
        type: Date, 
        required: true 
    },
    endDate: { 
        type: Date, 
        required: true 
    },
    frequency: {
        value: { type: Number, required: true },
        unit: { type: String, enum: ['minutes', 'hours', 'days'], required: true },
    },
    

}, { timestamps: true },
);

const Prayer = mongoose.model<IPrayerDoc>('Prayer', prayerSchema);

export default Prayer;