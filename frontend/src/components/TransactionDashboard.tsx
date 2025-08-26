/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { TransactionTable } from './TransactionTable';
import { SearchBar } from './SearchBar';
import { Pagination } from './Pagination';
import { useGetTransactionsQuery, useSearchTransactionsMutation } from '../store/api';
import { Activity, TrendingUp, TrendingDown, DollarSign } from 'lucide-react';

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

  const currentData = isSearchMode ? searchData : transactionsData;
  const isLoading = isSearchMode ? isSearching : isLoadingTransactions;
  const error = isSearchMode ? searchError : transactionsError;

  const transactions = currentData?.data || [];
  const totalIncoming = transactions
    .filter(t => t.receiver === 'current_user')
    .reduce((sum, t) => sum + t.amount, 0);
  const totalOutgoing = transactions
    .filter(t => t.sender === 'current_user')
    .reduce((sum, t) => sum + t.amount, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl shadow-lg">
              <Activity className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
                Transaction Dashboard
              </h1>
              <p className="text-slate-600 text-lg">Monitor and manage your financial activities</p>
            </div>
          </div>

          {!isLoading && transactions.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white rounded-2xl shadow-lg border border-slate-200/60 p-6 hover:shadow-xl transition-all duration-300">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-slate-600 text-sm font-medium mb-1">Total Transactions</p>
                    <p className="text-3xl font-bold text-slate-900">{transactions.length}</p>
                  </div>
                  <div className="p-3 bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl">
                    <DollarSign className="w-6 h-6 text-white" />
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-2xl shadow-lg border border-slate-200/60 p-6 hover:shadow-xl transition-all duration-300">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-slate-600 text-sm font-medium mb-1">Total Incoming</p>
                    <p className="text-3xl font-bold text-emerald-600">
                      ${totalIncoming.toLocaleString()}
                    </p>
                  </div>
                  <div className="p-3 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-xl">
                    <TrendingUp className="w-6 h-6 text-white" />
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-2xl shadow-lg border border-slate-200/60 p-6 hover:shadow-xl transition-all duration-300">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-slate-600 text-sm font-medium mb-1">Total Outgoing</p>
                    <p className="text-3xl font-bold text-rose-600">
                      ${totalOutgoing.toLocaleString()}
                    </p>
                  </div>
                  <div className="p-3 bg-gradient-to-r from-rose-500 to-rose-600 rounded-xl">
                    <TrendingDown className="w-6 h-6 text-white" />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="bg-white rounded-2xl shadow-xl border border-slate-200/60 overflow-hidden">
          <div className="px-8 py-8 bg-gradient-to-r from-slate-50 to-blue-50 border-b border-slate-200/60">
            <SearchBar 
              onSearch={handleSearch} 
              isLoading={isLoading}
            />
            
            {isSearchMode && searchQuery && (
              <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-xl">
                <div className="flex items-center justify-between">
                  <p className="text-sm text-blue-800">
                    Showing search results for: <span className="font-semibold bg-blue-100 px-2 py-1 rounded-lg">"{searchQuery}"</span>
                  </p>
                  <button 
                    onClick={() => handleSearch('')}
                    className="text-blue-600 hover:text-blue-800 text-sm font-medium hover:bg-blue-100 px-3 py-1 rounded-lg transition-colors"
                  >
                    Clear search
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className="px-8 py-8">
            {isLoading ? (
              <div className="flex flex-col justify-center items-center py-20">
                <div className="relative">
                  <div className="w-16 h-16 border-4 border-blue-200 rounded-full"></div>
                  <div className="w-16 h-16 border-4 border-blue-600 rounded-full animate-spin absolute top-0 left-0 border-t-transparent"></div>
                </div>
                <p className="mt-4 text-slate-600 font-medium">Loading transactions...</p>
              </div>
            ) : error ? (
              <div className="text-center py-20">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Activity className="w-8 h-8 text-red-600" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-2">Error loading transactions</h3>
                <p className="text-slate-600 mb-6 max-w-md mx-auto">
                  {(error as any)?.data?.message || 'Something went wrong while fetching transactions.'}
                </p>
                <button 
                  onClick={() => window.location.reload()}
                  className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-xl hover:from-blue-700 hover:to-indigo-700 font-medium shadow-lg hover:shadow-xl transition-all duration-200"
                >
                  Try Again
                </button>
              </div>
            ) : (
              <div className="space-y-6">
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
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};