import { useState } from 'react'
import './App.css'

function App() {
  const gridSize = 10;
  const [board, setBoard] = useState(Array(gridSize).fill(Array(gridSize).fill(null)));
  const [currentPlayer, setCurrentPlayer] = useState('V');
  const [gameOver, setGameOver] = useState(false);


  const handleCellClick = (row, col) => {
    if (gameOver) return;

    const newBoard = board.map((r) => r.slice());

    if (currentPlayer === 'V'){
      if (row < gridSize - 1 && board[row][col] === null && board[row + 1][col] === null) {
        newBoard[row][col] = currentPlayer;
        newBoard[row + 1][col] = currentPlayer;
        setBoard(newBoard);
        setCurrentPlayer('H');
      }
    } else if (currentPlayer === 'H') {
      if (col < gridSize - 1 && board[row][col] === null && board[row][col + 1] === null) {
        newBoard[row][col] = currentPlayer;
        newBoard[row][col + 1] = currentPlayer;
        setBoard(newBoard);
        setCurrentPlayer('V');
      }
    }
    checkGameOver(newBoard);
  };


  const checkGameOver = (newBoard) => {
    let validMoveFound = false;
    
    for (let row = 0; row < gridSize; row++) {
      for (let col = 0; col < gridSize; col++) {
        if (currentPlayer === 'V') {
          if (row < gridSize - 1 && newBoard[row][col] === null && newBoard[row + 1][col] === null) {
            validMoveFound = true;
            break;
          }
        } else if (currentPlayer === 'H') {
          if (col < gridSize - 1 && newBoard[row][col] === null && newBoard[row][col + 1] === null) {
            validMoveFound = true;
            break;
          }
        }
      }
    } 
    if (!validMoveFound){
      setGameOver(true);
    }
  };


  const renderBoard = () => {
    return board.map((row, rowIndex) => (
      <div key={rowIndex} className='board-row'>
        {row.map((cell, colIndex) => (
          <div
          key={colIndex}
          className={`cell ${cell ? `cell-${cell}` : ''}`}
          onClick={() => handleCellClick(rowIndex, colIndex)}
        />
        ))}
      </div>
    ));
  };


  return (
    <div className='game-container'>
      <h1>Domineering Game</h1>
      <p>Current Player: {currentPlayer}</p>
      {renderBoard()}
      {gameOver && <p>Game over! Player {currentPlayer === 'V' ? 'H' : 'V'} win!</p>}
    </div>
  );
}


export default App
