import React from 'react';
import logo from '../assets/images/parnuan-logo.png';

const Header: React.FC = () => {
  return (
    <header className="bg-white/80 backdrop-blur-md border-b border-pink-100 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
             <img src={logo} alt="Panuan Logo" className="w-20" />
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden md:block text-right">
              <p className="text-sm text-gray-500">ยินดีต้อนรับ</p>
              <p className="font-semibold text-pink-600">คุณสมชาย</p>
            </div>
            <div className="w-10 h-10 bg-gradient-to-br from-pink-400 to-rose-400 rounded-full flex items-center justify-center text-white font-bold">
              ส
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;