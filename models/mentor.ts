import mongoose, { Schema} from 'mongoose';
import { MentorDoc } from '../types';

const mentorSchema = new Schema<MentorDoc>({
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

const Mentor = mongoose.model<MentorDoc>('Mentor', mentorSchema);

export default Mentor;