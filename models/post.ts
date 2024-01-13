import mongoose, { Schema} from 'mongoose';
import { IPostDoc } from '../types';

const postSchema = new Schema<IPostDoc>(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    author: { 
        type: Schema.Types.ObjectId, 
        ref: 'User',
        required: true
    },
    categories: [{ type: Schema.Types.ObjectId, ref: 'Category' }],
  },
  { timestamps: true } 
);

const Post = mongoose.model<IPostDoc>('Post', postSchema);

export default Post;
