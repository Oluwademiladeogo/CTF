import express from 'express';
import * as postController from '../controllers/post';
import IsAuthenticated from '../middlewares/auth';
import { IsPostAuthor } from '../middlewares/isAuthor';

const router = express.Router();

router.get('/', postController.getAllPosts);
router.get('/:id', postController.getPostById);
router.post('/', IsAuthenticated, postController.createPost);
router.put('/:id', [IsAuthenticated, IsPostAuthor], postController.updatePostById);
router.delete('/:id', [IsAuthenticated, IsPostAuthor], postController.deletePostById);

export default router;
