import mongoose from 'mongoose';
import { PrayerDoc } from '../types';


const prayerSchema = new mongoose.Schema<PrayerDoc>({
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

const Prayer = mongoose.model<PrayerDoc>('Prayer', prayerSchema);

export default Prayer;