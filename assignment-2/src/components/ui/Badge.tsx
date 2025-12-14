import React from 'react';

interface BadgeProps {
  type: 'income' | 'expense';
}

const Badge: React.FC<BadgeProps> = ({ type }) => {
  const baseClasses = 'px-2 py-1 text-xs font-semibold rounded-full';
  const colorClasses = type === 'income' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800';

  return (
    <span className={`${baseClasses} ${colorClasses}`}>
      {type === 'income' ? 'รายรับ' : 'รายจ่าย'}
    </span>
  );
};

export default Badge;