import React from 'react';
import type { Transaction } from '../types';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface TransactionItemProps {
  transaction: Transaction;
}

const TransactionItem: React.FC<TransactionItemProps> = ({ transaction }) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('th-TH', { style: 'currency', currency: 'THB' }).format(amount);
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('th-TH', { day: 'numeric', month: 'short', year: 'numeric' });
  };

  return (
    <div className="flex items-center gap-2 sm:gap-4 p-3 sm:p-4 hover:bg-pink-50/50 rounded-xl transition-colors group">
      {/* Icon */}
      <div className={`shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center transition-transform group-hover:scale-110 ${
        transaction.type === 'income'
          ? 'bg-gradient-to-br from-green-100 to-emerald-100'
          : 'bg-gradient-to-br from-pink-100 to-rose-100'
      }`}>
        {transaction.type === 'income' 
          ? <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-green-600" />
          : <TrendingDown className="w-4 h-4 sm:w-5 sm:h-5 text-pink-600" />
        }
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        {/* Mobile Layout: Stack vertically */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-4">
          {/* Left side: Description & Date */}
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
              <span className={`shrink-0 px-2 py-0.5 rounded-full text-[10px] sm:text-xs font-semibold ${
                transaction.type === 'income' 
                  ? 'bg-green-400 text-white' 
                  : 'bg-pink-600 text-white'
              }`}>
                {transaction.type === 'income' ? 'รายรับ' : 'รายจ่าย'}
              </span>
              <span className="font-medium sm:font-semibold text-sm sm:text-base text-gray-800 truncate">
                {transaction.description}
              </span>
            </div>
            <p className="text-xs sm:text-sm text-gray-400 mt-0.5 sm:mt-1">
              {formatDate(transaction.date)}
            </p>
          </div>

          {/* Right side: Amount */}
          <div className={`shrink-0 font-bold text-base sm:text-lg ${
            transaction.type === 'income' ? 'text-green-600' : 'text-pink-600'
          }`}>
            {transaction.type === 'income' ? '+' : '-'}{formatCurrency(transaction.amount)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionItem;