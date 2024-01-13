import mongoose, { Schema} from 'mongoose';
import { PostDoc } from '../types';

const postSchema = new Schema<PostDoc>(
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

const Post = mongoose.model<PostDoc>('Post', postSchema);

export default Post;
