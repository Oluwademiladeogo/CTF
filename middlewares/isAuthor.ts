import { Response, NextFunction } from 'express';
import { ICustomRequest } from '../types';
import Testimony from '../models/testimonies';
import Post from '../models/post';

export const IsTestimonyAuthor = async (req: ICustomRequest, res: Response, next: NextFunction) => {
    const { id } = req.params;

    const testimony = await Testimony.findById(id);

    if (!testimony) {
        return res.status(404).json({ success: false, details: 'Post not found here' });
    }

    // Check if the user is the owner of the post
    if (testimony.testifier !== req.user?.id) {
        return res.status(403).json({ success: false, details: 'Forbidden: User is not the owner of the post' });
    }

    // Continue with the next middleware or route handler
    next();
};

export const IsPostAuthor = async (req: ICustomRequest, res: Response, next: NextFunction) => {
    const { id } = req.params;

    const post = await Post.findById(id);

    if (!post) {
        return res.status(404).json({ success: false, details: 'Post not found here' });
    }

    // Check if the user is the owner of the post
    if (post.author !== req.user?.id) {
        return res.status(403).json({ success: false, details: 'Forbidden: User is not the owner of the post' });
    }

    // Continue with the next middleware or route handler
    next();
};
