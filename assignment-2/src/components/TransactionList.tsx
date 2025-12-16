import React, { useState, useEffect, useLayoutEffect, useRef, startTransition } from 'react';
import type { Transaction } from '../types';
import TransactionItem from './TransactionItem';
import Card from './ui/Card';
import { ChevronLeft, ChevronRight, Loader } from 'lucide-react';

interface TransactionListProps {
  transactions: Transaction[];
  itemsPerPage?: number;
}

const TransactionList: React.FC<TransactionListProps> = ({ 
  transactions,
  itemsPerPage = 5 
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [isAnimating, setIsAnimating] = useState(false);
  const [slideDirection, setSlideDirection] = useState<'left' | 'right' | 'none'>('none');
  const [displayedTransactions, setDisplayedTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Calculate pagination
  const totalPages = Math.ceil(transactions.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  // Generate a unique key based on transaction IDs to detect filter changes
  const transactionsKey = transactions.map(t => t.id).join(',');

  // Reset to page 1 when transactions change (filter/search)
  useLayoutEffect(() => {
    startTransition(() => {
      setIsLoading(true);
      setSlideDirection('none');
      setCurrentPage(1);
      setIsAnimating(false);
    });
    setTimeout(() => {
      startTransition(() => {
        setDisplayedTransactions(transactions.slice(0, itemsPerPage));
        setIsLoading(false);
      });
    }, 300);
  }, [transactionsKey, itemsPerPage, transactions]);

  // Update displayed transactions with animation when page changes
  useEffect(() => {
    if (slideDirection === 'none') {
      return; // Skip animation, already handled by reset effect
    }

    const newStartIndex = (currentPage - 1) * itemsPerPage;
    const newEndIndex = newStartIndex + itemsPerPage;
    const newTransactions = transactions.slice(newStartIndex, newEndIndex);

    // After exit animation completes, update content and trigger enter animation
    const timer = setTimeout(() => {
      startTransition(() => {
        setDisplayedTransactions(newTransactions);
        setIsAnimating(false);
      });
    }, 200);

    return () => clearTimeout(timer);
  }, [currentPage, slideDirection, transactions, itemsPerPage]);

  const goToPage = (page: number, direction: 'left' | 'right') => {
    if (page >= 1 && page <= totalPages && !isAnimating) {
      startTransition(() => {
        setSlideDirection(direction);
        setIsAnimating(true);
        setCurrentPage(page);
      });
    }
  };

  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        pages.push(1, 2, 3, 4, '...', totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1, '...', totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages);
      }
    }
    
    return pages;
  };

  if (transactions.length === 0) {
    return (
      <Card className="text-center py-12 bg-white rounded-2xl shadow-lg shadow-pink-100/50 border border-pink-50">
        <p className="text-pink-400 font-medium text-lg">ไม่พบรายการที่ค้นหา</p>
        <p className="text-gray-400 text-sm mt-2">ลองค้นหาด้วยคำอื่น</p>
      </Card>
    );
  }

  return (
    <Card className="bg-white rounded-2xl shadow-lg shadow-pink-100/50 border border-pink-50 overflow-hidden">
      <div className="p-6 border-b border-pink-50">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-pink-600">รายการล่าสุด</h2>
          <span className="text-pink-400 text-sm font-medium px-3 py-1 bg-pink-50 rounded-full">
            ทั้งหมด {transactions.length} รายการ
          </span>
        </div>
      </div>
      
      {/* Transaction Items Container with Animation */}
      <div
        ref={containerRef}
        className="p-4 overflow-hidden"
      >
        {isLoading ? (
          <div className="flex justify-center items-center py-8">
            <Loader className="w-6 h-6 animate-spin text-pink-500" />
          </div>
        ) : (
          <div
            className={`space-y-2 transition-all duration-300 ease-out ${
              isAnimating
                ? slideDirection === 'right'
                  ? 'opacity-0 -translate-x-8'
                  : 'opacity-0 translate-x-8'
                : 'opacity-100 translate-x-0'
            }`}
          >
            {displayedTransactions.map((transaction, index) => (
              <div
                key={transaction.id}
                className="transform transition-all duration-300 ease-out"
                style={{
                  transitionDelay: isAnimating ? '0ms' : `${index * 50}ms`,
                  opacity: isAnimating ? 0 : 1,
                  transform: isAnimating ? 'translateY(10px)' : 'translateY(0)'
                }}
              >
                <TransactionItem transaction={transaction} />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="px-6 py-4 border-t border-pink-50 bg-gradient-to-r from-pink-50/50 to-rose-50/50">
          <div className="flex items-center justify-between">
            {/* Page Info */}
            <p className="text-sm text-gray-500">
              แสดง <span className="font-semibold text-pink-600">{startIndex + 1}-{Math.min(endIndex, transactions.length)}</span> จาก {transactions.length} รายการ
            </p>

            {/* Pagination Controls */}
            <div className="flex items-center gap-1">
              {/* Previous Button */}
              <button
                onClick={() => goToPage(currentPage - 1, 'left')}
                disabled={currentPage === 1 || isAnimating || isLoading}
                className={`p-2 rounded-xl transition-all duration-200 ${
                  currentPage === 1 || isAnimating || isLoading
                    ? 'text-gray-300 cursor-not-allowed'
                    : 'text-pink-500 hover:bg-pink-100 hover:scale-110 active:scale-95'
                }`}
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              {/* Page Numbers */}
              <div className="flex items-center gap-1">
                {getPageNumbers().map((page, index) => (
                  <React.Fragment key={index}>
                    {page === '...' ? (
                      <span className="px-2 text-gray-400">...</span>
                    ) : (
                      <button
                        onClick={() => goToPage(
                          page as number,
                          (page as number) > currentPage ? 'right' : 'left'
                        )}
                        disabled={isAnimating || isLoading}
                        className={`min-w-[40px] h-10 rounded-xl text-sm font-semibold transition-all duration-200 ${
                          currentPage === page
                            ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-lg shadow-pink-200/50 scale-105'
                            : 'text-gray-600 hover:bg-pink-100 hover:text-pink-600 hover:scale-105 active:scale-95'
                        }`}
                      >
                        {page}
                      </button>
                    )}
                  </React.Fragment>
                ))}
              </div>

              {/* Next Button */}
              <button
                onClick={() => goToPage(currentPage + 1, 'right')}
                disabled={currentPage === totalPages || isAnimating || isLoading}
                className={`p-2 rounded-xl transition-all duration-200 ${
                  currentPage === totalPages || isAnimating || isLoading
                    ? 'text-gray-300 cursor-not-allowed'
                    : 'text-pink-500 hover:bg-pink-100 hover:scale-110 active:scale-95'
                }`}
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

        </div>
      )}
    </Card>
  );
};

export default TransactionList;