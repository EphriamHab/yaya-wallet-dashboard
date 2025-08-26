export interface Transaction {
  id: string;
  sender: string;
  receiver: string;
  amount: number;
  currency: string;
  cause: string;
  created_at: string;
  type?: 'incoming' | 'outgoing';
}

export interface TransactionResponse {
  data: Transaction[];
  total: number;
  page: number;
  per_page: number;
  total_pages: number;
}

export interface SearchParams {
  query?: string;
  page?: number;
}