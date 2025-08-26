import express from 'express';
import { getTransactions, searchTransactions } from '../controllers/transactionController';

const router = express.Router();

router.get('/', getTransactions);
router.post('/search', searchTransactions);

export default router;
