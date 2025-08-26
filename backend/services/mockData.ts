export interface Transaction {
  id: string;
  sender: string;
  receiver: string;
  amount: number;
  currency: string;
  cause: string;
  created_at: string;
}

export const mockTransactions: Transaction[] = [
  // Incoming transactions
  {
    id: "TXN001",
    sender: "John Doe",
    receiver: "current_user",
    amount: 1500.00,
    currency: "ETB",
    cause: "Freelance payment",
    created_at: "2025-08-26T10:30:00Z"
  },
  {
    id: "TXN002",
    sender: "Alice Smith",
    receiver: "current_user", 
    amount: 750.25,
    currency: "ETB",
    cause: "Refund from store",
    created_at: "2025-08-26T09:15:00Z"
  },
  {
    id: "TXN003",
    sender: "current_user",
    receiver: "current_user",
    amount: 2000.00,
    currency: "ETB", 
    cause: "Account top-up",
    created_at: "2025-08-26T08:45:00Z"
  },
  {
    id: "TXN004", 
    sender: "Bob Wilson",
    receiver: "current_user",
    amount: 300.75,
    currency: "ETB",
    cause: "Service payment",
    created_at: "2025-08-25T16:20:00Z"
  },
  // Outgoing transactions
  {
    id: "TXN005",
    sender: "current_user", 
    receiver: "Jane Doe",
    amount: 450.50,
    currency: "ETB",
    cause: "Rent payment",
    created_at: "2025-08-25T14:10:00Z"
  },
  {
    id: "TXN006",
    sender: "current_user",
    receiver: "SuperMarket Ltd",
    amount: 125.75,
    currency: "ETB",
    cause: "Grocery shopping",
    created_at: "2025-08-25T12:30:00Z"
  },
  {
    id: "TXN007",
    sender: "current_user",
    receiver: "Electric Company", 
    amount: 200.00,
    currency: "ETB",
    cause: "Electricity bill",
    created_at: "2025-08-24T18:45:00Z"
  },
  {
    id: "TXN008",
    sender: "current_user",
    receiver: "Taxi Service",
    amount: 85.25,
    currency: "ETB",
    cause: "Transportation",
    created_at: "2025-08-24T16:15:00Z"
  },
  // More incoming
  {
    id: "TXN009",
    sender: "Mary Johnson", 
    receiver: "current_user",
    amount: 950.00,
    currency: "ETB",
    cause: "Loan repayment",
    created_at: "2025-08-24T11:20:00Z"
  },
  {
    id: "TXN010",
    sender: "current_user",
    receiver: "current_user",
    amount: 500.00,
    currency: "ETB",
    cause: "Bank transfer top-up",
    created_at: "2025-08-24T09:30:00Z"
  },
  // More outgoing
  {
    id: "TXN011",
    sender: "current_user",
    receiver: "Restaurant XYZ",
    amount: 65.50,
    currency: "ETB", 
    cause: "Dinner payment",
    created_at: "2025-08-23T19:45:00Z"
  },
  {
    id: "TXN012",
    sender: "current_user",
    receiver: "Peter Brown",
    amount: 175.00,
    currency: "ETB",
    cause: "Gift transfer", 
    created_at: "2025-08-23T15:20:00Z"
  },
  {
    id: "TXN013",
    sender: "Sarah Wilson",
    receiver: "current_user",
    amount: 425.75,
    currency: "ETB",
    cause: "Shared expense",
    created_at: "2025-08-23T13:10:00Z"
  },
  {
    id: "TXN014", 
    sender: "current_user",
    receiver: "Mobile Company",
    amount: 50.00,
    currency: "ETB",
    cause: "Mobile recharge",
    created_at: "2025-08-23T10:30:00Z"
  },
  {
    id: "TXN015",
    sender: "Tom Davis",
    receiver: "current_user", 
    amount: 800.00,
    currency: "ETB",
    cause: "Project payment",
    created_at: "2025-08-22T17:45:00Z"
  }
];

export const getMockTransactions = (page: number = 1, perPage: number = 10) => {
  const startIndex = (page - 1) * perPage;
  const endIndex = startIndex + perPage;
  const paginatedData = mockTransactions.slice(startIndex, endIndex);
  
  return {
    data: paginatedData,
    total: mockTransactions.length,
    page: page,
    per_page: perPage,
    total_pages: Math.ceil(mockTransactions.length / perPage),
    current_page: page,
    from: startIndex + 1,
    to: Math.min(endIndex, mockTransactions.length)
  };
};

export const searchMockTransactions = (query: string, page: number = 1, perPage: number = 10) => {
  const searchTerm = query.toLowerCase();
  const filtered = mockTransactions.filter(transaction => 
    transaction.id.toLowerCase().includes(searchTerm) ||
    transaction.sender.toLowerCase().includes(searchTerm) ||
    transaction.receiver.toLowerCase().includes(searchTerm) ||
    transaction.cause.toLowerCase().includes(searchTerm)
  );
  
  const startIndex = (page - 1) * perPage;
  const endIndex = startIndex + perPage;
  const paginatedData = filtered.slice(startIndex, endIndex);
  
  return {
    data: paginatedData,
    total: filtered.length,
    page: page,
    per_page: perPage,
    total_pages: Math.ceil(filtered.length / perPage),
    current_page: page,
    from: startIndex + 1,
    to: Math.min(endIndex, filtered.length),
    query: query
  };
};