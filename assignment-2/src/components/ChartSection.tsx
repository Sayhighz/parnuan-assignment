import React, { useMemo } from 'react';
import { PieChart, Pie, Cell, AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import Card from './ui/Card';
import { categorizeTransaction } from '../lib/utils';
import type { Transaction } from '../types';

interface ChartSectionProps {
  transactions: Transaction[];
  selectedCategory: string | null;
  selectedMonth: string | null;
  onCategorySelect: (category: string | null) => void;
  onMonthSelect: (month: string | null) => void;
}

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('th-TH', { style: 'currency', currency: 'THB' }).format(amount);
};

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{ color: string; name: string; value: number }>;
  label?: string;
}

const CustomTooltip: React.FC<CustomTooltipProps> = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-4 rounded-xl shadow-lg border border-pink-100">
        <p className="font-semibold text-pink-600 mb-2">{label}</p>
        {payload.map((entry, index) => (
          <p key={index} className="text-sm" style={{ color: entry.color }}>
            {entry.name === 'income' ? 'รายรับ' : 'รายจ่าย'}: {formatCurrency(entry.value)}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

const ChartSection: React.FC<ChartSectionProps> = ({
  transactions,
  selectedCategory,
  selectedMonth,
  onCategorySelect,
  onMonthSelect,
}) => {
  const monthlyData = useMemo(() => {
    const monthMap: { [key: string]: { income: number; expense: number } } = {};
    transactions.forEach((t) => {
      const month = t.date.toLocaleDateString('th-TH', { month: 'short' });
      if (!monthMap[month]) {
        monthMap[month] = { income: 0, expense: 0 };
      }
      if (t.type === 'income') {
        monthMap[month].income += t.amount;
      } else {
        monthMap[month].expense += t.amount;
      }
    });
    return Object.entries(monthMap).map(([month, data]) => ({
      month,
      income: data.income,
      expense: data.expense,
    }));
  }, [transactions]);

  const categoryData = useMemo(() => {
    const categoryMap: { [key: string]: { value: number; color: string } } = {};
    const colors = ['#FF6B9D', '#C44569', '#F8B5C4', '#FFD93D', '#6BCF7F', '#4ECDC4', '#45B7D1'];
    transactions
      .filter((t) => t.type === 'expense')
      .forEach((t) => {
        const category = categorizeTransaction(t.description);
        if (!categoryMap[category]) {
          categoryMap[category] = { value: 0, color: colors[Object.keys(categoryMap).length % colors.length] };
        }
        categoryMap[category].value += t.amount;
      });
    return Object.entries(categoryMap).map(([name, data]) => ({
      name,
      value: data.value,
      color: data.color,
    }));
  }, [transactions]);
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
      {/* Area Chart */}
      <Card className="p-6 bg-white rounded-2xl shadow-lg shadow-pink-100/50 border border-pink-50">
        <h3 className="text-lg font-bold text-pink-600 mb-6">ภาพรวมรายรับ-รายจ่าย</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={monthlyData}>
              <defs>
                <linearGradient id="incomeGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10B981" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="expenseGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#EC4899" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#EC4899" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <XAxis 
                dataKey="month" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: '#9CA3AF', fontSize: 12 }} 
              />
              <YAxis 
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: '#9CA3AF', fontSize: 12 }} 
                tickFormatter={(v) => `${v/1000}k`} 
              />
              <Tooltip content={<CustomTooltip />} />
              <Area
                type="monotone"
                dataKey="income"
                stroke="#10B981"
                strokeWidth={3}
                fill="url(#incomeGradient)"
              />
              <Area
                type="monotone"
                dataKey="expense"
                stroke="#EC4899"
                strokeWidth={3}
                fill="url(#expenseGradient)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div className="flex justify-center gap-6 mt-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-green-500" />
            <span className="text-sm text-gray-500">รายรับ</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-pink-500" />
            <span className="text-sm text-gray-500">รายจ่าย</span>
          </div>
        </div>
      </Card>

      {/* Pie Chart */}
      <Card className="p-6 bg-white rounded-2xl shadow-lg shadow-pink-100/50 border border-pink-50">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-bold text-pink-600">หมวดหมู่รายจ่าย</h3>
          {selectedCategory && (
            <button
              onClick={() => onCategorySelect(null)}
              className="px-3 py-1 text-sm bg-pink-100 text-pink-600 rounded-full hover:bg-pink-200 transition-colors"
            >
              รีเซ็ต
            </button>
          )}
        </div>
        <div className="h-64 flex items-center justify-center">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={90}
                paddingAngle={5}
                dataKey="value"
                onClick={(data) => onCategorySelect(data ? data.name : null)}
                style={{ cursor: 'pointer' }}
              >
                {categoryData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={entry.color}
                    opacity={selectedCategory === entry.name ? 1 : 0.7}
                  />
                ))}
              </Pie>
              <Tooltip 
                formatter={(value: number) => formatCurrency(value)}
                contentStyle={{ 
                  background: 'white', 
                  border: '1px solid #FDF2F8', 
                  borderRadius: '12px',
                  boxShadow: '0 4px 12px rgba(236, 72, 153, 0.1)'
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="grid grid-cols-2 gap-3 mt-4">
           {categoryData.map((cat, index) => (
             <div
               key={index}
               className="flex items-center gap-2 cursor-pointer hover:bg-pink-50 p-2 rounded"
               onClick={() => onCategorySelect(cat.name)}
             >
               <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ backgroundColor: cat.color, opacity: selectedCategory === cat.name ? 1 : 0.7 }} />
               <span className="text-sm text-gray-600 truncate">{cat.name}</span>
               <span className="text-sm font-semibold text-pink-600 ml-auto">{formatCurrency(cat.value)}</span>
             </div>
           ))}
         </div>
      </Card>
    </div>
  );
};

export default ChartSection;