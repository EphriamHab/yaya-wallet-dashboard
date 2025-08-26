import type { Request, Response } from 'express';
import { yayaApi } from '../config/api';

export const getTransactions = async (req: Request, res: Response) => {
  try {
    const { p = 1 } = req.query;

    const response = await yayaApi.get('/transaction/find-by-user', {
      params: { p }
    });

    res.json(response.data);
  } catch (error: any) {
    console.error('Error fetching transactions:', error.response?.data || error.message);
    res.status(error.response?.status || 500).json({
      error: 'Failed to fetch transactions',
      message: error.response?.data?.message || error.message
    });
  }
};

export const searchTransactions = async (req: Request, res: Response) => {
  try {
    const { query, p = 1 } = req.body;

    if (!query) {
      return res.status(400).json({ error: 'Query parameter is required' });
    }

    const response = await yayaApi.post('/transaction/search', { query, p });

    res.json(response.data);
  } catch (error: any) {
    console.error('Error searching transactions:', error.response?.data || error.message);
    res.status(error.response?.status || 500).json({
      error: 'Failed to search transactions',
      message: error.response?.data?.message || error.message
    });
  }
};
