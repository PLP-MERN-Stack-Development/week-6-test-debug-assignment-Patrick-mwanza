import express from 'express';
import {
  createBug,
  getBugs,
  updateBug,
  deleteBug,
} from '../controllers/bugController.js';

const router = express.Router();

router.route('/').get(getBugs).post(createBug);
router.route('/:id').put(updateBug).delete(deleteBug);

export default router;
