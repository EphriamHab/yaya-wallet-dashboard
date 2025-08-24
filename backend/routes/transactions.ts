import express from 'express';
import { getTransactions, searchTransactions } from '../controllers/transactionController.js';

const router = express.Router();

router.get('/', getTransactions);
router.post('/search', searchTransactions);

export default router;
