import Joi from 'joi';
import { PostDto } from '../dto/post.dto';

const postSchema = Joi.object({
    title: Joi.string().required(),
    content: Joi.string().required(),
    author: Joi.string().required(),
    categories: Joi.array().items(Joi.string())
});

export const validatePost = (data: PostDto) => {
    return postSchema.validate(data);
};

const updatePostSchema = Joi.object({
    title: Joi.string(),
    content: Joi.string(),
    author: Joi.string(),
    categories: Joi.array().items(Joi.string()),
});

export const validateUpdatedPost = (data: PostDto) => {
    return updatePostSchema.validate(data);
};
