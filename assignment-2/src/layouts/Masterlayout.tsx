import React from 'react'
import Header from './Header'
import Sidebar from './Sidebar'

interface MasterlayoutProps {
  children: React.ReactNode
}

export const Masterlayout: React.FC<MasterlayoutProps> = ({ children }) => {
  return (
    <div className="masterlayout">
      <Header />
      <div className="content">
        <Sidebar />
        <main>{children}</main>
      </div>
    </div>
  )
}
