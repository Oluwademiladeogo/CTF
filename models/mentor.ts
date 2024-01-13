import mongoose, { Schema} from 'mongoose';
import { IMentorDoc } from '../types';

const mentorSchema = new Schema<IMentorDoc>({
    name: { 
        type: String, 
        required: true 
    },
    specialty: { 
        type: String, 
        required: true 
    },
    user: { 
        type: Schema.Types.ObjectId, 
        ref: 'User', required: true 
    },
    joinedAt: { 
        type: Date, 
        required: true, 
        default: Date.now 
    },
    mentees: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    },
    { timestamps: true }
);

const Mentor = mongoose.model<IMentorDoc>('Mentor', mentorSchema);

export default Mentor;