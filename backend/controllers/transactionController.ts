import type { Request, Response } from "express";
import { generateSignature } from "../config/api";
import axios from "axios";
import {
  getMockTransactions,
  searchMockTransactions,
} from "../services/mockData";

const USE_MOCK = process.env.USE_MOCK_DATA === "true";
const CURRENT_USER = process.env.CURRENT_USER || "current_user";

export const getTransactions = async (req: Request, res: Response) => {
  try {
    const { p = 1, perPage = 10 } = req.query;

    if (USE_MOCK) {
      const mockData = getMockTransactions(Number(p), Number(perPage));
      return res.json(mockData);
    }

    const { timestamp, signature } = generateSignature(""); 

    const response = await axios.get(
      `${process.env.YAYA_BASE_URL}/transaction/find-by-user`,
      {
        headers: {
          "YAYA-API-KEY": process.env.YAYA_API_KEY!,
          "YAYA-API-TIMESTAMP": timestamp,
          "YAYA-API-SIGN": signature,
          "Content-Type": "application/json",
        },
        params: { p: Number(p) },
        timeout: 10000,
      }
    );

    res.json(response.data);
  } catch (error: any) {
    console.error(
      "Error fetching transactions:",
      error.response?.data || error.message
    );

    const { p = 1, perPage = 10 } = req.query;
    const mockData = getMockTransactions(Number(p), Number(perPage));

    res.status(200).json({
      ...mockData,
      fallback: true,
      message: "Using mock data due to API error",
    });
  }
};

export const searchTransactions = async (req: Request, res: Response) => {
  try {
    const { query, p = 1, perPage = 10 } = req.body;

    if (!query) {
      return res.status(400).json({ error: "Query parameter is required" });
    }

    if (USE_MOCK) {
      const mockData = searchMockTransactions(
        query,
        Number(p),
        Number(perPage)
      );
      return res.json(mockData);
    }

    const body = JSON.stringify({ query, p });
    const { timestamp, signature } = generateSignature(body);
    const response = await axios.post(
      `${process.env.YAYA_BASE_URL}/transaction/search`,
      { query, p },
      {
        headers: {
          "YAYA-API-KEY": process.env.YAYA_API_KEY!,
          "YAYA-API-TIMESTAMP": timestamp,
          "YAYA-API-SIGN": signature,
          "Content-Type": "application/json",
        },
      }
    );
    res.json(response.data);
  } catch (error: any) {
    console.error(
      "Error searching transactions:",
      error.response?.data || error.message
    );

    const { query, p = 1, perPage = 10 } = req.body;
    const mockData = searchMockTransactions(query, Number(p), Number(perPage));

    res.status(200).json({
      ...mockData,
      fallback: true,
      message: "Using mock data due to API error",
    });
  }
};
