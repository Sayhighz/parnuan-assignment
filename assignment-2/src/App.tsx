import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Masterlayout } from './layouts/Masterlayout'
import Dashboard from './pages/Dashboard/Dashboard'

function App() {
  return (
    <Router>
      <Masterlayout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
        </Routes>
      </Masterlayout>
    </Router>
  )
}

export default App
