import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import History from '../UI framwork/Historypage';
import Header from '../UI framwork/header';
import Footer from '../UI framwork/footer';
import PlayerHistory from '../UI framwork/playercommon';
import Buttons from '../UI framwork/buttons';

const App: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Router>
        <Header />
        <main className="flex-grow pt-20">
          <Routes>
          <Route path="/" element={<Buttons />} />

            <Route path="/history" element={<History />} />
            <Route path="/playerhistory" element={<PlayerHistory />} />
          </Routes>
        </main>
        <Footer />
      </Router>
    </div>
  );
};

export default App;
