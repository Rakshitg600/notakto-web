import React, { useState } from 'react';
// import { motion } from 'framer-motion';

interface GameGridProps {
  gridIndex: number;
  onCellClick: (gridIndex: number, cellIndex: number) => void;
  disabled?: boolean;
}

const GameGrid: React.FC<GameGridProps> = ({ gridIndex, onCellClick, disabled = false }) => {
  const [grid, setGrid] = useState<string[]>(Array(9).fill(''));

  const handleCellClick = (cellIndex: number) => {
    if (disabled || grid[cellIndex]) return;
    
    const newGrid = [...grid];
    newGrid[cellIndex] = 'X';
    setGrid(newGrid);
    onCellClick(gridIndex, cellIndex);
  };

  return (
    <div className="grid grid-cols-3 gap-[2px] bg-transparent">
      {grid.map((cell, index) => (
        <button
          key={index}
          onClick={() => handleCellClick(index)}
          disabled={!!cell || disabled}
          className={`
            w-full aspect-square 
            border border-gray-700 
            bg-black 
            flex items-center justify-center 
            text-4xl font-bold
            ${cell ? 'text-blue-500' : 'text-gray-500'}
            ${disabled || cell ? 'cursor-not-allowed' : 'hover:bg-gray-900'}
          `}
        >
          {cell}
        </button>
      ))}
    </div>
  );
};

export default GameGrid;