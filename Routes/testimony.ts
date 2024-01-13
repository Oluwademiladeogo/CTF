import express from 'express';
import {
  createTestimony,
  getAllTestimonies,
  getTestimonyById,
  updateTestimonyById,
  deleteTestimonyById,
} from '../controllers/testimony';
import { IsTestimonyAuthor } from '../middlewares/isAuthor';
import IsAuthenticated from '../middlewares/auth';

const router = express.Router();

router.get('/', getAllTestimonies);
router.get('/:id', getTestimonyById);
router.post('/', IsAuthenticated, createTestimony);
router.put('/:id', [IsAuthenticated, IsTestimonyAuthor], updateTestimonyById);
router.delete('/:id', [IsAuthenticated, IsTestimonyAuthor], deleteTestimonyById);

export default router;
