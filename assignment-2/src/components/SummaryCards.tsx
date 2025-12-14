import React from 'react';
import Card from './ui/Card';
import { NumberTicker } from './ui/number-ticker';
import { TrendingUp, TrendingDown, Wallet } from 'lucide-react';

interface SummaryCardsProps {
  totalIncome: number;
  totalExpense: number;
  balance: number;
}

const SummaryCards: React.FC<SummaryCardsProps> = ({ totalIncome, totalExpense, balance }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-8">
      {/* Income Card */}
      <Card className="p-6 relative overflow-hidden group hover:scale-[1.02] transition-transform duration-300 bg-white">
        <div className="relative">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-3 bg-emerald-500 rounded-full shadow-lg shadow-green-200">
              <TrendingUp className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-gray-500 font-medium">รายรับทั้งหมด</h3>
          </div>
          <NumberTicker 
            value={totalIncome}
            startValue={totalIncome-3}
            locale="th-TH" 
            currency="THB" 
            decimalPlaces={2} 
            className="text-3xl font-bold text-green-600" 
          />
          <p className="text-sm text-green-500 mt-2 flex items-center gap-1">
            <span className="inline-flex items-center justify-center w-5 h-5 bg-green-100 rounded-full">
              <TrendingUp className="w-3 h-3 text-green-600" />
            </span> +12.5% จากเดือนที่แล้ว
          </p>
        </div>
      </Card>

      {/* Expense Card */}
      <Card className="p-6 relative overflow-hidden group hover:scale-[1.02] transition-transform duration-300 bg-white">
        <div className="relative">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-3 bg-pink-600 rounded-full shadow-lg shadow-pink-200">
              <TrendingDown className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-gray-500 font-medium">รายจ่ายทั้งหมด</h3>
          </div>
          <NumberTicker 
            value={totalExpense} 
            locale="th-TH" 
            currency="THB" 
            decimalPlaces={2} 
            startValue={totalExpense-3}
            className="text-3xl font-bold text-pink-600" 
          />
          <p className="text-sm text-pink-500 mt-2 flex items-center gap-1">
            <span className="inline-flex items-center justify-center w-5 h-5 bg-pink-100 rounded-full">
              <TrendingDown className="w-3 h-3 text-pink-600" />
            </span> -8.3% จากเดือนที่แล้ว
          </p>
        </div>
      </Card>

      {/* Balance Card */}
      <Card className="p-6 relative overflow-hidden group hover:scale-[1.02] transition-transform duration-300 bg-pink-600 md:col-span-2 lg:col-span-1">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2" />
        <div className="relative">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-3 bg-white/20 backdrop-blur rounded-full">
              <Wallet className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-pink-100 font-medium">ยอดคงเหลือ</h3>
          </div>
          <NumberTicker 
            value={balance} 
            locale="th-TH" 
            currency="THB" 
            decimalPlaces={2} 
            startValue={balance-3}
            className="text-3xl font-bold text-white" 
          />
          <p className="text-sm text-pink-100 mt-2">สถานะการเงินดี</p>
        </div>
      </Card>
    </div>
  );
};

export default SummaryCards;
