import React, { useState } from 'react';
import { motion } from 'framer-motion';

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
    <motion.div 
      className="grid grid-cols-3 gap-1 bg-gray-800 p-1 rounded-lg"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
    >
      {grid.map((cell, index) => (
        <motion.div
          key={index}
          className={`aspect-square bg-black border border-gray-700 flex items-center justify-center text-4xl cursor-pointer 
            ${cell ? 'text-red-500' : 'text-gray-500 hover:bg-gray-900'}
            ${disabled ? 'cursor-not-allowed' : ''}`}
          onClick={() => handleCellClick(index)}
          whileHover={{ scale: !disabled && !cell ? 1.05 : 1 }}
        >
          {cell}
        </motion.div>
      ))}
    </motion.div>
  );
};

export default GameGrid;