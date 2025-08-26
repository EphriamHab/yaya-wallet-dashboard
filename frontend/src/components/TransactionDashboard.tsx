import React, { useState, useEffect } from 'react';
import { TransactionTable } from './TransactionTable';
import { SearchBar } from './SearchBar';
import { Pagination } from './Pagination';
import { useGetTransactionsQuery, useSearchTransactionsMutation } from '../store/api';

export const TransactionDashboard: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchMode, setIsSearchMode] = useState(false);
  
  const { data: transactionsData, isLoading: isLoadingTransactions, error: transactionsError } = 
    useGetTransactionsQuery({ page: currentPage }, { skip: isSearchMode });
  
  const [searchTransactions, { data: searchData, isLoading: isSearching, error: searchError }] = 
    useSearchTransactionsMutation();

  const handleSearch = async (query: string) => {
    if (query.trim()) {
      setIsSearchMode(true);
      setCurrentPage(1);
      setSearchQuery(query);
      await searchTransactions({ query, page: 1 });
    } else {
      setIsSearchMode(false);
      setSearchQuery('');
      setCurrentPage(1);
    }
  };

  const handlePageChange = async (page: number) => {
    setCurrentPage(page);
    
    if (isSearchMode && searchQuery) {
      await searchTransactions({ query: searchQuery, page });
    }
  };

  // Use search data when in search mode, otherwise use regular transactions data
  const currentData = isSearchMode ? searchData : transactionsData;
  const isLoading = isSearchMode ? isSearching : isLoadingTransactions;
  const error = isSearchMode ? searchError : transactionsError;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Transaction Dashboard</h1>
          <p className="mt-2 text-gray-600">Monitor your account transactions</p>
        </div>

        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-6 border-b border-gray-200">
            <SearchBar 
              onSearch={handleSearch} 
              isLoading={isLoading}
            />
            
            {isSearchMode && searchQuery && (
              <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-md">
                <p className="text-sm text-blue-800">
                  Showing search results for: <span className="font-semibold">"{searchQuery}"</span>
                  <button 
                    onClick={() => handleSearch('')}
                    className="ml-2 text-blue-600 hover:text-blue-800 underline"
                  >
                    Clear search
                  </button>
                </p>
              </div>
            )}
          </div>

          <div className="px-6 py-6">
            {isLoading ? (
              <div className="flex justify-center items-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                <span className="ml-3 text-gray-600">Loading transactions...</span>
              </div>
            ) : error ? (
              <div className="text-center py-12">
                <div className="text-red-600 mb-4">
                  <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Error loading transactions</h3>
                <p className="text-gray-600 mb-4">
                  {(error as any)?.data?.message || 'Something went wrong while fetching transactions.'}
                </p>
                <button 
                  onClick={() => window.location.reload()}
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                  Try Again
                </button>
              </div>
            ) : (
              <>
                <TransactionTable 
                  transactions={currentData?.data || []} 
                />
                
                {currentData && (
                  <Pagination
                    currentPage={currentData.page || currentPage}
                    totalPages={currentData.total_pages || 1}
                    onPageChange={handlePageChange}
                    isLoading={isLoading}
                  />
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};