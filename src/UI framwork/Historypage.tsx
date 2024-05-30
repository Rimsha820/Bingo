import React, { useState } from "react";
import PlayerHistory from "./playercommon";

const History: React.FC = () => {
  const [activeTab, setActiveTab] = useState("player1");

  return (
    <div className="mt-6 ml-6 mb-[20rem] flex flex-col">
      <div className="flex">
        <button
          className={`px-4 py-2 border-gray-200 rounded ${activeTab === "player1" ? "bg-blue-500 text-white" : "bg-gray-200 text-black"}`}
          onClick={() => setActiveTab("player1")}
        >
          Player 1
        </button>
        <button
          className={`px-4 py-2 border-none rounded ${activeTab === "player2" ? "bg-blue-500 text-white" : "bg-gray-200 text-black"}`}
          onClick={() => setActiveTab("player2")}
        >
          Player 2
        </button>
      </div>
      <div className="mt-8">
        {activeTab === "player1" && (
          <div>
            <PlayerHistory player="player1" />
          </div>
        )}
        {activeTab === "player2" && (
          <div>
            <PlayerHistory player="player2" />
          </div>
        )}
      </div>
    </div>
  );
};

export default History;
