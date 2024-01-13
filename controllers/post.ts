import { Request, Response } from 'express';
import Post from '../models/post';
import { PostDto } from '../dto/post.dto';
import { validatePost, validateUpdatedPost } from '../validators/post';
import mongoose from 'mongoose';

export const createPost = async (req: Request, res: Response): Promise<Response> => {
    const { error } = validatePost(req.body);

    if (error) {
        return res.status(400).json({ success: false, details: error.details[0].message });
    }

    const { title, content, author, categories }: PostDto = req.body;

    const newPost = new Post({
        title,
        content,
        author,
        categories,
    });

    const savedPost = await newPost.save();

    return res.status(201).json({ success: true, post: savedPost });
};

export const getAllPosts = async (_req: Request, res: Response): Promise<Response> => {
    const posts = await Post.find();
    return res.status(200).json({ success: true, posts });
};

export const getPostById = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
        return res.status(400).json({ success: false, details: `${id} is not a valid ID` });
    }

    const post = await Post.findById(id);

    if (!post) {
        return res.status(404).json({ success: false, details: 'Post not found' });
    }

    return res.status(200).json({ success: true, post });
};

export const updatePostById = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
        return res.status(400).json({ success: false, details: `${id} is not a valid ID` });
    }

    const { error } = validateUpdatedPost(req.body);

    if (error) {
        return res.status(400).json({ success: false, details: error.details[0].message });
    }

    const { title, content, author, categories }: Partial<PostDto> = req.body;

    const updatedPost = await Post.findByIdAndUpdate(
        id,
        { title, content, author, categories },
        { new: true }
    );

    if (!updatedPost) {
        return res.status(404).json({ success: false, details: 'Post not found' });
    }

    return res.status(200).json({ success: true, post: updatedPost });
};

export const deletePostById = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
        return res.status(400).json({ success: false, details: `${id} is not a valid ID` });
    }

    const deletedPost = await Post.findByIdAndDelete(id);

    if (!deletedPost) {
        return res.status(404).json({ success: false, details: 'Post not found' });
    }

    return res.status(200).json({ success: true });
};
