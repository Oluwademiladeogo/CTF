import express from 'express';
import {
  createTestimony,
  getAllTestimonies,
  getTestimonyById,
  updateTestimonyById,
  deleteTestimonyById,
} from '../controllers/testimony';

const router = express.Router();

router.post('/testimonies', createTestimony);
router.get('/testimonies', getAllTestimonies);
router.get('/testimonies/:id', getTestimonyById);
router.put('/testimonies/:id', updateTestimonyById);
router.delete('/testimonies/:id', deleteTestimonyById);

export default router;
