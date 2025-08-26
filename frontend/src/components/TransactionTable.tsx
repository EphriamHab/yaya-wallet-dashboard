import React from 'react';
import type { Transaction } from '../types/transaction';
import { ArrowUpIcon, ArrowDownIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';

interface TransactionTableProps {
  transactions: Transaction[];
  currentUser?: string;
}

export const TransactionTable: React.FC<TransactionTableProps> = ({
  transactions,
  currentUser = 'current_user' 
}) => {
  const getTransactionType = (transaction: Transaction): 'incoming' | 'outgoing' => {
    if (transaction.sender === transaction.receiver) {
      return 'incoming';
    }
    return transaction.receiver === currentUser ? 'incoming' : 'outgoing';
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  const formatAmount = (amount: number, currency: string) => {
    return `${amount.toLocaleString()} ${currency}`;
  };

  return (
    <div className="overflow-x-auto shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
      <table className="min-w-full divide-y divide-gray-300">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Type
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Transaction ID
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Sender
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Receiver
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Amount
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Cause
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Created At
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {transactions.map((transaction) => {
            const type = getTransactionType(transaction);
            const isIncoming = type === 'incoming';
            
            return (
              <tr
                key={transaction.id}
                className={clsx(
                  'hover:bg-gray-50',
                  isIncoming ? 'border-l-4 border-green-400' : 'border-l-4 border-red-400'
                )}
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className={clsx(
                    'flex items-center gap-2',
                    isIncoming ? 'text-green-600' : 'text-red-600'
                  )}>
                    {isIncoming ? (
                      <ArrowDownIcon className="h-4 w-4" />
                    ) : (
                      <ArrowUpIcon className="h-4 w-4" />
                    )}
                    <span className="text-sm font-medium">
                      {isIncoming ? 'Incoming' : 'Outgoing'}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-mono">
                  {transaction.id}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {transaction.sender}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {transaction.receiver}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <span className={clsx(
                    isIncoming ? 'text-green-600' : 'text-red-600'
                  )}>
                    {isIncoming ? '+' : '-'}{formatAmount(transaction.amount, transaction.currency)}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {transaction.cause}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {formatDate(transaction.created_at)}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      
      {transactions.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No transactions found.</p>
        </div>
      )}
    </div>
  );
};