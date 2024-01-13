import mongoose, { Schema, Document, Types } from 'mongoose';
import { PartnerDoc } from "../types";


const partnerSchema = new Schema<PartnerDoc>(
    {
      joinedAt: { type: Date, required: true, default: Date.now },
      user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    },
    { timestamps: true }
);

const Partner = mongoose.model<PartnerDoc>('Partner', partnerSchema);

export default Partner;