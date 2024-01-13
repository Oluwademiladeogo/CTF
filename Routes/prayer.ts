import express from 'express';
import {
  createPrayer,
  getAllPrayers,
  getPrayerById,
  updatePrayerById,
  deletePrayerById,
} from '../controllers/prayer';

const router = express.Router();

// Routes
router.post('/', createPrayer);
router.get('/', getAllPrayers);
router.get('/:id', getPrayerById);
router.put('/:id', updatePrayerById);
router.delete('/:id', deletePrayerById);

export default router;
