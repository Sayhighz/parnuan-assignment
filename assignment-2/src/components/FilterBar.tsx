import React from 'react';

interface Filters {
  type: 'all' | 'income' | 'expense';
}

interface FilterBarProps {
  filters: Filters;
  onFilterChange: (filters: Filters) => void;
}

const FilterBar: React.FC<FilterBarProps> = ({ filters, onFilterChange }) => {
  const handleTypeChange = (type: 'all' | 'income' | 'expense') => {
    onFilterChange({ ...filters, type });
  };

  const buttons = [
    { key: 'all' as const, label: 'ทั้งหมด', activeClass: 'bg-pink-500 text-white shadow-lg' },
    { key: 'income' as const, label: 'รายรับ', activeClass: 'bg-green-400 text-white shadow-lg' },
    { key: 'expense' as const, label: 'รายจ่าย', activeClass: 'bg-pink-400 text-white shadow-lg' },
  ];

  return (
    <div className="flex gap-2">
      {buttons.map(({ key, label, activeClass }) => (
        <button
          key={key}
          onClick={() => handleTypeChange(key)}
          className={`px-5 py-2.5 rounded-xl font-medium transition-all duration-300 ${
            filters.type === key
              ? activeClass
              : 'bg-pink-50 text-pink-600 hover:bg-pink-100'
          }`}
        >
          {label}
        </button>
      ))}
    </div>
  );
};

export default FilterBar;