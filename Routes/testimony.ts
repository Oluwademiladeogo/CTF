import express from 'express';
import {
  createTestimony,
  getAllTestimonies,
  getTestimonyById,
  updateTestimonyById,
  deleteTestimonyById,
} from '../controllers/testimony';

const router = express.Router();

router.post('/', createTestimony);
router.get('/', getAllTestimonies);
router.get('/:id', getTestimonyById);
router.put('/:id', updateTestimonyById);
router.delete('/:id', deleteTestimonyById);

export default router;
