import React from "react";

const PlayerHistory: React.FC = () => {
  return (
    <div>
      <table className="mt-16 ml-8 text-black border-collapse border border-gray-400 w-auto h-auto">
        <thead>
          <tr>
            <th className="border border-gray-400 px-4 py-2">serial no</th>
            <th className="border border-gray-400 px-4 py-2">Game ID</th>
            <th className="border border-gray-400 px-4 py-2">Won</th>
            <th className="border border-gray-400 px-4 py-2">lose</th>
            <th className="border border-gray-400 px-4 py-2">Time Taken</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border border-gray-400 px-4 py-2">1</td>
            <td className="border border-gray-400 px-4 py-2">432</td>
            <td className="border border-gray-400 px-4 py-2">2</td>

            <td className="border border-gray-400 px-4 py-2">
              4</td>
              <td className="border border-gray-400 px-4 py-2">2 minutes</td>
            
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default PlayerHistory;
