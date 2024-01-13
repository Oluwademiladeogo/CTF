import express from 'express';
import * as postController from '../controllers/post';

const router = express.Router();

router.post('/', postController.createPost);
router.get('/', postController.getAllPosts);
router.get('/:id', postController.getPostById);
router.put('/:id', postController.updatePostById);
router.delete('/:id', postController.deletePostById);

export default router;
