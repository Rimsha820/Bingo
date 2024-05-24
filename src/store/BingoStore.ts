import { makeAutoObservable } from 'mobx';

class BingoStore {
  player1Grid: number[][] = [];
  player2Grid: number[][] = [];
  numbersCalled: number[] = [];
  gameStarted: boolean = false;
  currentNumber: number | null = null;

  constructor() {
    makeAutoObservable(this);
    this.resetGame();
  }

  startGame() {
    this.gameStarted = true;
    this.callNumber();
  }

  generateRandomGrid(): number[][] {
    const numbers = Array.from({ length: 99 }, (_, i) => i + 1);
    const shuffled = numbers.sort(() => Math.random() - 0.5);
    return Array(5).fill(0).map((_, rowIndex) => shuffled.slice(rowIndex * 5, rowIndex * 5 + 5));
  }

  generateRandomGrids() {
    this.player1Grid = this.generateRandomGrid();
    this.player2Grid = this.generateRandomGrid();
  }

  callNumber() {
    if (!this.gameStarted || this.numbersCalled.length >= 99) return;

    let number;
    do {
      number = Math.floor(Math.random() * 99) + 1;
    } while (this.numbersCalled.includes(number));
    this.numbersCalled.push(number);
    this.currentNumber = number;

    setTimeout(() => this.callNumber(), 1200); 
  }

  resetGame() {
    this.numbersCalled = [];
    this.currentNumber = null;
    this.gameStarted = false;
    this.generateRandomGrids();
  }

  checkBingo(grid: number[][]): boolean {
    const rows = grid;
    const cols = grid[0].map((_, i) => grid.map(row => row[i]));
    const diags = [
      grid.map((row, i) => row[i]),
      grid.map((row, i) => row[grid.length - 1 - i]),
    ];

    const lines = [...rows, ...cols, ...diags];
    return lines.some(line => line.every(num => this.numbersCalled.includes(num)));
  }

  get player1HasBingo() {
    return this.checkBingo(this.player1Grid);
  }

  get player2HasBingo() {
    return this.checkBingo(this.player2Grid);
  }
}

const bingoStore = new BingoStore();
export default bingoStore;
