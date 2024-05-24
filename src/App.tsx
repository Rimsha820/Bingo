import React, { useState, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import CardGrid from './interface/CardGrid';
import bingoStore from './store/BingoStore';
import '../src/index.css';

const App: React.FC = observer(() => {
  const [winner, setWinner] = useState<string | null>(null);

  useEffect(() => {
    if (bingoStore.player1HasBingo) {
      setWinner('Player 1');
    } else if (bingoStore.player2HasBingo) {
      setWinner('Player 2');
    } else {
      setWinner(null);
    }
  }, [bingoStore.player1HasBingo, bingoStore.player2HasBingo]);

  const handleStartClick = () => {
    bingoStore.startGame();
  };

  const handleResetClick = () => {
    bingoStore.resetGame();
    setWinner(null);
  };

  return (
    <div className="App min-h-screen w-full flex flex-col items-center justify-center bg-blue-200">
      <div className="flex items-center justify-center space-x-8 mb-8">
        <div className="bg-green-300 rounded-lg p-6 shadow-md">
          <h1 className="text-3xl font-semibold mb-4 text-center">Player 1</h1>
          <CardGrid grid={bingoStore.player1Grid} />
        </div>
        <div className="flex justify-center items-center">
          <div className={`bg-red-500 rounded-full h-16 w-16 flex items-center font-bold justify-center text-white text-xl ${bingoStore.currentNumber ? 'pop-animation' : ''}`}>
            {bingoStore.currentNumber}
          </div>
        </div>
        <div className="bg-green-300 rounded-lg p-6 shadow-md">
          <h1 className="text-3xl font-semibold mb-4 text-center">Player 2</h1>
          <CardGrid grid={bingoStore.player2Grid} />
        </div>
      </div>
      <button
        className="bg-blue-500 text-white font-semibold py-2 px-6 rounded-md hover:bg-green-600 transition duration-300"
        onClick={handleStartClick}
        disabled={bingoStore.gameStarted}
      >
        Start
      </button>
      <button
        className="bg-red-500 text-white font-bold py-2 px-6 rounded-md hover:bg-red-600 transition duration-300 mt-4"
        onClick={handleResetClick}
      >
        Reset
      </button>

      {winner && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-8 rounded-lg shadow-lg text-center">
            <h2 className="text-4xl font-bold mb-4">{winner} Wins!</h2>
            <button
              className="bg-red-500 text-white font-bold py-2 px-6 rounded-md hover:bg-red-600 transition duration-300 mt-4"
              onClick={handleResetClick}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
});

export default App;
