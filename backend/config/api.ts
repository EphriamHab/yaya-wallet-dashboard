import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();


if (!process.env.YAYA_API_KEY || !process.env.YAYA_API_SECRET) {
  throw new Error("Missing YAYA API credentials");
}

export const yayaApi = axios.create({
  baseURL: process.env.YAYA_BASE_URL, 
  headers: {
    "YAYA-API-KEY": process.env.YAYA_API_KEY,     
    "YAYA-API-SECRET": process.env.YAYA_API_SECRET!,
    "Content-Type": "application/json",
  },
  timeout: 15000,
});