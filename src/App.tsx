import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import HomePage from './components/HomePage';
import ProblemSolver from './components/ProblemSolver';
import History from './components/History';
import { ProblemProvider } from './context/ProblemContext';
import ParticleBackground from './components/ParticleBackground';
import FloatingElements from './components/FloatingElements';

function App() {
  return (
    <ProblemProvider>
      <Router>
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 relative overflow-hidden">
          <ParticleBackground />
          <FloatingElements />
          <Header />
          <main className="container mx-auto px-4 py-8 relative z-10">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/solve/:subject" element={<ProblemSolver />} />
              <Route path="/history" element={<History />} />
            </Routes>
          </main>
        </div>
      </Router>
    </ProblemProvider>
  );
}

export default App;