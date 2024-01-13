import mongoose, { Schema, Document, Types } from 'mongoose';
import { IPartnerDoc } from "../types";


const partnerSchema = new Schema<IPartnerDoc>(
    {
      joinedAt: { type: Date, required: true, default: Date.now },
      user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    },
    { timestamps: true }
);

const Partner = mongoose.model<IPartnerDoc>('Partner', partnerSchema);

export default Partner;