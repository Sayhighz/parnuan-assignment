import React from 'react';
import Header from './Header';
import Footer from './Footer';

interface MasterlayoutProps {
  children: React.ReactNode;
}

export const Masterlayout: React.FC<MasterlayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-rose-50">
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
};
