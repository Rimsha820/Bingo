import { types, flow, cast, Instance } from "mobx-state-tree";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { db } from '../interface/firebaseconfig';
import { toJS } from 'mobx';

export interface IBingoStore extends Instance<typeof BingoStore> {}

const GameHistoryEntry = types.model("GameHistoryEntry", {
  id: types.identifierNumber,
  player1Wins: types.number,
  player2Wins: types.number,
  player1Loses: types.number,
  player2Loses: types.number,
  timeTaken: types.number,
});

const BingoStore = types
  .model("BingoStore", {
    player1Grid: types.array(types.array(types.number)),
    player2Grid: types.array(types.array(types.number)),
    numbersCalled: types.array(types.number),
    gameStarted: types.boolean,
    currentNumber: types.maybeNull(types.number),
    gameHistory: types.array(GameHistoryEntry),
    loading: types.optional(types.boolean, false),
  })
  .views(self => ({
    get getGameHistory() {
      return toJS(self.gameHistory);
    },
    get isLoading() {
      return self.loading;
    },
    checkBingo(grid) {
      const rows = grid;
      const cols = grid[0].map((_, i) => grid.map((row) => row[i]));
      const diags = [
        grid.map((row, i) => row[i]),
        grid.map((row, i) => row[grid.length - 1 - i]),
      ];

      const lines = [...rows, ...cols, ...diags];
      return lines.some((line) => line.every((num) => self.numbersCalled.includes(num)));
    },
    get player1HasBingo() {
      return self.checkBingo(self.player1Grid);
    },
    get player2HasBingo() {
      return self.checkBingo(self.player2Grid);
    },
  }))
  .actions(self => {
    const generateRandomGrid = () => {
      const numbers = Array.from({ length: 99 }, (_, i) => i + 1);
      const shuffled = numbers.sort(() => Math.random() - 0.5);
      return Array(5)
        .fill(0)
        .map((_, rowIndex) => shuffled.slice(rowIndex * 5, rowIndex * 5 + 5));
    };

    const generateRandomGrids = () => {
      self.player1Grid = generateRandomGrid();
      self.player2Grid = generateRandomGrid();
    };

    const callNumber = () => {
      if (!self.gameStarted || self.numbersCalled.length >= 99 || self.player1HasBingo || self.player2HasBingo)
        return;

      let number;
      do {
        number = Math.floor(Math.random() * 99) + 1;
      } while (self.numbersCalled.includes(number));
      self.numbersCalled.push(number);
      self.currentNumber = number;

      setTimeout(() => callNumber(), 1200);
    };

    const startGame = () => {
      self.gameStarted = true;
      callNumber();
    };

    const resetGame = () => {
      self.numbersCalled = [];
      self.currentNumber = null;
      self.gameStarted = false;
      generateRandomGrids();
    };

    const generateUniqueId = () => {
      let uniqueId:number;
      do {
        uniqueId = Math.floor(Math.random() * 900) + 100;
      } while (self.gameHistory.some((game: any) => game.id === uniqueId));
      return uniqueId;
    };

    const endGame = () => {
      const player1Wins = self.player1HasBingo ? 1 : 0;
      const player2Wins = self.player2HasBingo ? 1 : 0;

      const gameData = {
        id: generateUniqueId(),
        player1Wins,
        player2Wins,
        player1Loses: player2Wins,
        player2Loses: player1Wins,
        timeTaken: calculateTimeTaken(),
      };

      self.gameHistory.push(GameHistoryEntry.create(gameData));
      saveGameHistory(gameData);
    };

    const calculateTimeTaken = () => {
      const endTime = Date.now();
      const startTime = endTime - self.numbersCalled.length * 1200;
      return Math.floor((endTime - startTime) / 1000);
    };

    const saveGameHistory = flow(function* (gameData) {
      try {
        self.loading = true;
        yield addDoc(collection(db, "gameHistory"), gameData);
        notification.success("Game history saved successfully.");
      } catch (e) {
        notification.error("Error saving game history.");
        console.error("Error adding document: ", e);
      } finally {
        self.loading = false;
      }
    });

    const loadGameHistory = flow(function* () {
      try {
        self.loading = true;
        self.gameHistory = cast([]);
        const querySnapshot = yield getDocs(collection(db, "gameHistory"));
        querySnapshot.forEach((doc:any) => {
          const data = doc.data();
          self.gameHistory.push(GameHistoryEntry.create({
            id: data.id,
            player1Wins: data.player1Wins,
            player2Wins: data.player2Wins,
            player1Loses: data.player1Loses,
            player2Loses: data.player2Loses,
            timeTaken: data.timeTaken,
          }));
        });
      } catch (e) {
        notification.error("Error loading game history.");
        console.error("Error loading game history: ", e);
      } finally {
        self.loading = false;
      }
    });

    return {
      generateRandomGrid,
      generateRandomGrids,
      callNumber,
      startGame,
      resetGame,
      generateUniqueId,
      endGame,
      calculateTimeTaken,
      saveGameHistory,
      loadGameHistory,
    };
  });

const bingoStore = BingoStore.create({
  player1Grid: [],
  player2Grid: [],
  numbersCalled: [],
  gameStarted: false,
  currentNumber: null,
  gameHistory: [],
});

bingoStore.resetGame();
bingoStore.loadGameHistory();

export default bingoStore;
