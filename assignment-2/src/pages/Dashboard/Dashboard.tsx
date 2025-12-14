import React, { useState, useMemo } from 'react';
import { mockTransactions } from '../../data/mockData';
import SummaryCards from '../../components/SummaryCards';
import TransactionList from '../../components/TransactionList';
import FilterBar from '../../components/FilterBar';
import SearchBar from '../../components/SearchBar';
import ChartSection from '../../components/ChartSection';
import { categorizeTransaction } from '../../lib/utils';
import type { Transaction } from '../../types';

const Dashboard = () => {
  const [filters, setFilters] = useState({ type: 'all' as 'all' | 'income' | 'expense' });
  const [query, setQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedMonth, setSelectedMonth] = useState<string | null>(null);

  const filteredTransactionsForTotals = useMemo(() => {
    return mockTransactions.filter((t) => {
      const month = t.date.toLocaleDateString('th-TH', { month: 'short' });
      const matchesMonth = !selectedMonth || month === selectedMonth;
      const category = categorizeTransaction(t.description);
      const matchesCategory = !selectedCategory || (t.type === 'expense' && category === selectedCategory);
      return matchesMonth && matchesCategory;
    });
  }, [selectedCategory, selectedMonth]);

  const totalIncome = filteredTransactionsForTotals
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpense = filteredTransactionsForTotals
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);

  const balance = totalIncome - totalExpense;

  const filteredTransactions = useMemo(() => {
    return mockTransactions.filter((transaction) => {
      const matchesType = filters.type === 'all' || transaction.type === filters.type;
      const matchesQuery = transaction.description.toLowerCase().includes(query.toLowerCase());
      return matchesType && matchesQuery;
    });
  }, [filters, query]);

  return (
    <main className="container mx-auto px-4 py-8">
      {/* Page Title */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-pink-600 mb-2">แดชบอร์ดธุรกรรม</h2>
        <p className="text-gray-500">ติดตามรายรับรายจ่ายของคุณอย่างง่ายดาย</p>
      </div>

      {/* Summary Cards */}
      <SummaryCards totalIncome={totalIncome} totalExpense={totalExpense} balance={balance} />

      {/* Charts */}
      <ChartSection
        transactions={mockTransactions}
        selectedCategory={selectedCategory}
        selectedMonth={selectedMonth}
        onCategorySelect={setSelectedCategory}
        onMonthSelect={setSelectedMonth}
      />

      {/* Search and Filter */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="flex-1">
          <SearchBar query={query} onSearch={setQuery} />
        </div>
        <FilterBar filters={filters} onFilterChange={setFilters} />
      </div>

      {/* Transaction List */}
      <TransactionList transactions={filteredTransactions} />
    </main>
  );
};

export default Dashboard;