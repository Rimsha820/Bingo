import React, { useState, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import bingoStore from '../core/BingoStore';
import CardGrid from './CardGrid';

const Buttons: React.FC = observer(() => {
  const [winner, setWinner] = useState<string | null>(null);
  const [popAnimationKey, setPopAnimationKey] = useState<number>(0);

  useEffect(() => {
    if (bingoStore.player1HasBingo || bingoStore.player2HasBingo) {
      bingoStore.endGame();
      if (bingoStore.player1HasBingo) {
        setWinner('Player 1');
      } else {
        setWinner('Player 2');
      }
    } else {
      setWinner(null);
    }
  }, [bingoStore.player1HasBingo, bingoStore.player2HasBingo]);

  useEffect(() => {
    if (bingoStore.currentNumber !== null) {
      setPopAnimationKey(prevKey => prevKey + 1);
    }
  }, [bingoStore.currentNumber]);

  const handleStartClick = () => {
    bingoStore.startGame();
  };

  const handleResetClick = () => {
    bingoStore.resetGame();
    setWinner(null);
  };

  return (
    <div className="fixed App w-full flex flex-col items-center justify-center bg-white">
      <div className="flex items-center justify-center space-x-8 mb-8">
        <div className="bg-green-500 rounded-lg p-6 shadow-md">
          <h1 className="text-3xl font-semibold mb-4 text-center">Player 1</h1>
          <CardGrid grid={bingoStore.player1Grid} />
        </div>
        <div className="flex justify-center items-center">
          <div
            key={popAnimationKey}
            className={`bg-red-500 rounded-full h-16 w-16 flex items-center font-bold justify-center text-white text-xl pop-animation`}
          >
            {bingoStore.currentNumber}
          </div>
        </div>
        <div className="bg-green-500 rounded-lg p-6 shadow-md">
          <h1 className="text-3xl font-semibold mb-4 text-center">Player 2</h1>
          <CardGrid grid={bingoStore.player2Grid} />
        </div>
      </div>
      <div className='flex'>
        <button
          className="bg-blue-500 text-white font-semibold py-2 px-6 rounded-md hover:bg-green-600 transition duration-300"
          onClick={handleStartClick}
          disabled={bingoStore.gameStarted}
        >
          Start
        </button>
        <button
          className="bg-red-500 ml-2 text-white font-bold py-2 px-6 rounded-md hover:bg-red-600 transition duration-300"
          onClick={handleResetClick}
        >
          Reset
        </button>
      </div>
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

export default Buttons;