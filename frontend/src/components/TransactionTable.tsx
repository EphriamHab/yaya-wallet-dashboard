import React from 'react';
import type { Transaction } from '../types/transaction';
import { ArrowUpRight, ArrowDownLeft, Calendar, User, Hash, FileText } from 'lucide-react';
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

  if (transactions.length === 0) {
    return (
      <div className="text-center py-20">
        <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <FileText className="w-8 h-8 text-slate-400" />
        </div>
        <h3 className="text-lg font-semibold text-slate-900 mb-2">No transactions found</h3>
        <p className="text-slate-600">Try adjusting your search criteria or check back later.</p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 shadow-lg">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-200">
          <thead className="bg-gradient-to-r from-slate-50 to-slate-100">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                <div className="flex items-center gap-2">
                  <ArrowUpRight className="w-4 h-4" />
                  Type
                </div>
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                <div className="flex items-center gap-2">
                  <Hash className="w-4 h-4" />
                  Transaction ID
                </div>
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  Sender
                </div>
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  Receiver
                </div>
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                Amount
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4" />
                  Cause
                </div>
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  Created At
                </div>
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-slate-100">
            {transactions.map((transaction) => {
              const type = getTransactionType(transaction);
              const isIncoming = type === 'incoming';
              
              return (
                <tr
                  key={transaction.id}
                  className={clsx(
                    'hover:bg-slate-50 transition-colors duration-200',
                    isIncoming 
                      ? 'border-l-4 border-emerald-400 bg-gradient-to-r from-emerald-50/30 to-transparent' 
                      : 'border-l-4 border-rose-400 bg-gradient-to-r from-rose-50/30 to-transparent'
                  )}
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className={clsx(
                      'flex items-center gap-2',
                      isIncoming ? 'text-emerald-600' : 'text-rose-600'
                    )}>
                      <div className={clsx(
                        'p-2 rounded-lg',
                        isIncoming ? 'bg-emerald-100' : 'bg-rose-100'
                      )}>
                        {isIncoming ? (
                          <ArrowDownLeft className="h-4 w-4" />
                        ) : (
                          <ArrowUpRight className="h-4 w-4" />
                        )}
                      </div>
                      <span className="text-sm font-semibold">
                        {isIncoming ? 'Incoming' : 'Outgoing'}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm font-mono text-slate-600 bg-slate-100 px-2 py-1 rounded-lg">
                      {transaction.id}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-xs font-bold mr-3">
                        {transaction.sender.charAt(0).toUpperCase()}
                      </div>
                      <span className="text-sm text-slate-900 font-medium">{transaction.sender}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-teal-500 rounded-full flex items-center justify-center text-white text-xs font-bold mr-3">
                        {transaction.receiver.charAt(0).toUpperCase()}
                      </div>
                      <span className="text-sm text-slate-900 font-medium">{transaction.receiver}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={clsx(
                      'text-lg font-bold px-3 py-1 rounded-lg',
                      isIncoming 
                        ? 'text-emerald-700 bg-emerald-50' 
                        : 'text-rose-700 bg-rose-50'
                    )}>
                      {isIncoming ? '+' : '-'}{formatAmount(transaction.amount, transaction.currency)}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-slate-700 bg-slate-50 px-3 py-1 rounded-lg">
                      {transaction.cause}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                    {formatDate(transaction.created_at)}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};