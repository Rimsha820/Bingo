import React from "react";
import { observer } from 'mobx-react-lite';
import bingoStore from '../core/BingoStore';

interface PlayerHistoryProps {
  player: "player1" | "player2";
}

const PlayerHistory: React.FC<PlayerHistoryProps> = observer(({ player }) => {
  const playerWins = player === "player1" ? "player1Wins" : "player2Wins";
  const playerLoses = player === "player1" ? "player1Loses" : "player2Loses";

 

  return (
    <div>
      <div className="grid grid-cols-2 gap-8">
        <div>
          <h2 className="text-2xl font-semibold mb-2 ml-[13rem]">History</h2>
          <table className="text-black border-collapse border border-gray-400">
            <thead>
              <tr>
                <th className="border border-gray-400 px-4 py-2">Serial No</th>
                <th className="border border-gray-400 px-4 py-2">Game ID</th>
                <th className="border border-gray-400 px-4 py-2">Won</th>
                <th className="border border-gray-400 px-4 py-2">Lose</th>
                <th className="border border-gray-400 px-4 py-2">Time Taken (sec)</th>
              </tr>
            </thead>
            <tbody>
              {bingoStore.gameHistory.map((game, index) => (
                <tr key={index}>
                  <td className="border border-gray-400 px-4 py-2">{index + 1}</td>
                  <td className="border border-gray-400 px-4 py-2">{game.id}</td>
                  <td className="border border-gray-400 px-4 py-2">{game[playerWins]}</td>
                  <td className="border border-gray-400 px-4 py-2">{game[playerLoses]}</td>
                  <td className="border border-gray-400 px-4 py-2">{game.timeTaken} sec</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
});

export default PlayerHistory;
