import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import History from './interface/Historypage';
import Header from './interface/header';
import Footer from './interface/footer';
import PlayerHistory from './playercommon';

const App: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Router>
        <Header />
        <main className="flex-grow pt-24">
          <Routes>
            <Route path="history" element={<History />} />
            <Route path="playerhistory" element={<PlayerHistory />} />
          </Routes>
        </main>
        <Footer />
      </Router>
    </div>
  );
};

export default App;
