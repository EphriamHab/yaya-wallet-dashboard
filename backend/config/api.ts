import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

export const yayaApi = axios.create({
  baseURL: 'https://yayawallet.com/api/en',
  headers: {
    'YAYA-API-KEY': process.env.YAYA_API_KEY,
    'YAYA-API-SECRET': process.env.YAYA_API_SECRET,
    'Content-Type': 'application/json'
  }
});