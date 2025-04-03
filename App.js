import React, { useState, useEffect } from "react";
import "./index.css";

const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const App = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXTurn, setIsXTurn] = useState(true);
  const [score, setScore] = useState({ X: 0, O: 0 });
  const [rounds, setRounds] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [winner, setWinner] = useState("");

  const checkWinner = (newBoard) => {
    for (let combo of winningCombinations) {
      const [a, b, c] = combo;
      if (
        newBoard[a] &&
        newBoard[a] === newBoard[b] &&
        newBoard[a] === newBoard[c]
      ) {
        return newBoard[a];
      }
    }
    return newBoard.includes(null) ? null : "Tie";
  };

  const handleClick = (index) => {
    if (board[index] || gameOver) return;

    const newBoard = [...board];
    newBoard[index] = isXTurn ? "X" : "O";
    setBoard(newBoard);

    const result = checkWinner(newBoard);

    if (result) {
      if (result === "X") {
        setScore((prev) => ({ ...prev, X: prev.X + 1 }));
      } else if (result === "O") {
        setScore((prev) => ({ ...prev, O: prev.O + 1 }));
      }
      setTimeout(() => resetBoard(), 1000);
      setRounds((prev) => prev + 1);
    } else {
      setIsXTurn(!isXTurn);
    }
  };

  const resetBoard = () => {
    setBoard(Array(9).fill(null));
    setIsXTurn(true);
  };

  useEffect(() => {
    if (rounds >= 5) {
      if (score.X > score.O) {
        setWinner("X Wins the Game!");
      } else if (score.O > score.X) {
        setWinner("O Wins the Game!");
      } else {
        setWinner("Game is Tied!");
      }
      setGameOver(true);
    }
  }, [rounds, score]);

  return (
    <div className="container">
      <h1>Tic Tac Toe</h1>
      <div className="scoreboard">
        <p>❌  {score.X}</p>
        <p>🔵  {score.O}</p>
      </div>

      {gameOver ? (
        <div className="game-over">
          <h2>{winner}</h2>
          <h1 className="big-text">GAME OVER</h1>
        </div>
      ) : (
        <div className="board">
          {board.map((cell, index) => (
            <div
              key={index}
              className={`cell ${cell === "X" ? "x" : cell === "O" ? "o" : ""}`}
              onClick={() => handleClick(index)}
            >
              {cell}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default App;
