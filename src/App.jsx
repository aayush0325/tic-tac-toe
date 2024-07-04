import { useState } from 'react'
import './App.css'

function App() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Board />
    </div>
  )
}

export function Board() {
  const [squares, setSquares] = useState(Array(9).fill(''))
  const [xIsNext, setXIsNext] = useState(true)

  function handleClick(i) {
    if (squares[i] || calculateWinner(squares)) {
      return
    }
    const nextSquares = squares.slice()
    if (xIsNext) {
      nextSquares[i] = 'X'
      setXIsNext(false)
    } else {
      nextSquares[i] = 'O'
      setXIsNext(true)
    }

    setSquares(nextSquares)
  }

  const winner = calculateWinner(squares)
  let status = ''
  if (winner) {
    status = 'Winner: ' + winner
  } else {
    status = 'Next player: ' + (xIsNext ? 'X' : 'O')
  }

  return (
    <div className="text-center">
      <h1 className="text-2xl font-bold mb-4">{status}</h1>
      <div className="grid grid-cols-3 gap-2">
        {squares.map((square, i) => (
          <Square key={i} value={square} onSquareClick={() => handleClick(i)} />
        ))}
      </div>
      <button
        type="button"
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
        onClick={() => {
          setSquares(Array(9).fill(''))
          setXIsNext(true)
        }}
      >
        Clear
      </button>
    </div>
  )
}

export function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ]
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i]
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a]
    }
  }
  return null
}

export function Square({ value, onSquareClick }) {
  return (
    <button
      className="w-16 h-16 border border-gray-400 text-2xl"
      onClick={onSquareClick}
    >
      {value}
    </button>
  )
}

export default App
