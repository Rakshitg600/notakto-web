import React, { useState, useEffect } from 'react';

interface GameGridProps {
  gridIndex: number;
  onCellClick: (gridIndex: number, cellIndex: number) => void;
  disabled?: boolean;
  cells?: string[];
  isBlocked?: boolean;
  winLine?: number[] | null;
}

const GameGrid: React.FC<GameGridProps> = ({ 
  gridIndex, 
  onCellClick, 
  disabled = false,
  cells: propCells,
  isBlocked = false,
  winLine = null
}) => {
  const [grid, setGrid] = useState<string[]>(Array(9).fill(''));
  
  // Update local grid state when prop cells change
  useEffect(() => {
    if (propCells) {
      setGrid(propCells);
    }
  }, [propCells]);

  const handleCellClick = (cellIndex: number) => {
    if (disabled || grid[cellIndex] || isBlocked) return;
    
    // Let parent component handle the state updates
    onCellClick(gridIndex, cellIndex);
  };

  return (
    <div className={`grid grid-cols-3 gap-[2px] bg-transparent relative ${isBlocked ? 'opacity-60' : ''}`}>
      {grid.map((cell, index) => (
        <button
          key={index}
          onClick={() => handleCellClick(index)}
          disabled={!!cell || disabled || isBlocked}
          className={`
            w-full aspect-square 
            border border-gray-700
            bg-black
            flex items-center justify-center
            text-4xl font-bold
            ${cell ? 'text-blue-500' : 'text-gray-500'}
            ${winLine && winLine.includes(index) ? 'bg-red-900' : ''}
            ${disabled || cell || isBlocked ? 'cursor-not-allowed' : 'hover:bg-gray-900'}
          `}
        >
          {cell}
        </button>
      ))}
      {isBlocked && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40">
          <span className="text-2xl font-bold text-red-500">BLOCKED</span>
        </div>
      )}
    </div>
  );
};

export default GameGrid;