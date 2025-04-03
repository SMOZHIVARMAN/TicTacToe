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
  const [winner, setWinner] = useState("");
  const [gameOver, setGameOver] = useState(false);
  const [roundWinner, setRoundWinner] = useState("");
  const [history, setHistory] = useState([]); // Tracks round history

  const checkWinner = (newBoard) => {
    for (let combo of winningCombinations) {
      const [a, b, c] = combo;
      if (newBoard[a] && newBoard[a] === newBoard[b] && newBoard[a] === newBoard[c]) {
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
      const roundResult = result === "Tie" ? "Round Tied!" : `${result} Wins Round ${rounds + 1}`;
      setRoundWinner(roundResult);

      if (result === "X") setScore((prev) => ({ ...prev, X: prev.X + 1 }));
      if (result === "O") setScore((prev) => ({ ...prev, O: prev.O + 1 }));

      setHistory((prev) => [...prev, roundResult]); // Store round result
      setTimeout(() => resetBoard(), 1500);
      setRounds((prev) => prev + 1);
    } else {
      setIsXTurn(!isXTurn);
    }
  };

  const resetBoard = () => {
    setBoard(Array(9).fill(null));
    setIsXTurn(true);
    setRoundWinner("");
  };

  useEffect(() => {
    if (score.X === 2) {
      setWinner("X Wins the Series!");
      setGameOver(true);
    } else if (score.O === 2) {
      setWinner("O Wins the Series!");
      setGameOver(true);
    }
  }, [score]);

  const restartSeries = () => {
    setBoard(Array(9).fill(null));
    setIsXTurn(true);
    setScore({ X: 0, O: 0 });
    setRounds(0);
    setWinner("");
    setGameOver(false);
    setRoundWinner("");
    setHistory([]); // Clear history
  };

  return (
    <div className="container">
      <h1>Tic Tac Toe - Best of 3</h1>
      <div className="scoreboard">
        <p>❌ {score.X}</p>
        <p>🔵 {score.O}</p>
      </div>

      {gameOver ? (
        <div className="game-over">
          <h2>{winner}</h2>
          <h1 className="big-text">GAME OVER</h1>
          <button className="reset-series-btn" onClick={restartSeries}>Restart Series</button>
        </div>
      ) : (
        <>
          <h3 className="winner">{roundWinner}</h3>
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
          <div className="history">
            <h3>Round History</h3>
            <ul>
              {history.map((entry, index) => (
                <li key={index}>{entry}</li>
              ))}
            </ul>
          </div>
        </>
      )}
    </div>
  );
};

export default App;
