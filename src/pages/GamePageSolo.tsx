import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import GameGrid from '../components/GameGrid';
import SettingsSolo from '../components/SettingsSolo';
import { useCoins, useXP } from '../constants/store';

// Define interface for grid state
interface GridState {
  cells: string[];
  isBlocked: boolean;
  winLine: number[] | null;
}

// Define AI difficulty levels
const AI_LEVELS = {
  1: 0.2, // Easy - 20% chance of making a smart move
  2: 0.5, // Medium - 50% chance of making a smart move
  3: 0.8, // Hard - 80% chance of making a smart move
};

const GamePageSolo: React.FC = () => {
  const [playerName, setPlayerName] = useState('');
  const [gameStarted, setGameStarted] = useState(false);
  const [currentTurn, setCurrentTurn] = useState('Player');
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const { coins, setCoins } = useCoins();
  const { XP, setXP } = useXP();
  // Grid states
  const [grids, setGrids] = useState<GridState[]>([
    { cells: Array(9).fill(''), isBlocked: false, winLine: null },
    { cells: Array(9).fill(''), isBlocked: false, winLine: null },
    { cells: Array(9).fill(''), isBlocked: false, winLine: null }
  ]);

  // Track which grids are still active (not blocked)
  const [gridsAlive, setGridsAlive] = useState([true, true, true]);

  // Game over state
  const [gameOver, setGameOver] = useState(false);
  const [winner, setWinner] = useState<string | null>(null);


  // Solo settings state
  const [soloSettings, setSoloSettings] = useState({
    aiLevel: 1,
    soundOn: true,
  });

  // Check if a move creates a winning pattern (which in this game is actually a losing pattern)
  const checkForWinningPattern = (cells: string[]): number[] | null => {
    const winPatterns = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
      [0, 4, 8], [2, 4, 6]             // diagonals
    ];

    for (const pattern of winPatterns) {
      const [a, b, c] = pattern;
      if (cells[a] && cells[a] === cells[b] && cells[a] === cells[c]) {
        return pattern;
      }
    }
    return null;
  };

  // Find best move for AI based on difficulty level
  const findBestMove = (gridIndex: number): number => {
    const cells = [...grids[gridIndex].cells];

    // Random move if board is empty or based on AI level
    if (Math.random() > AI_LEVELS[soloSettings.aiLevel as keyof typeof AI_LEVELS]) {
      const emptyCells = cells.map((cell, index) => cell === '' ? index : -1).filter(idx => idx !== -1);
      return emptyCells[Math.floor(Math.random() * emptyCells.length)];
    }

    // Try to find a move that doesn't create a winning pattern
    for (let i = 0; i < cells.length; i++) {
      if (cells[i] === '') {
        cells[i] = 'X';
        const winPattern = checkForWinningPattern(cells);
        cells[i] = '';

        if (!winPattern) {
          return i;
        }
      }
    }

    // If all moves lead to a win pattern, pick a random empty cell
    const emptyCells = cells.map((cell, index) => cell === '' ? index : -1).filter(idx => idx !== -1);
    return emptyCells.length > 0 ? emptyCells[Math.floor(Math.random() * emptyCells.length)] : -1;
  };

  // Make a move
  const makeMove = (gridIndex: number, cellIndex: number) => {
    if (gameOver || grids[gridIndex].isBlocked || grids[gridIndex].cells[cellIndex] !== '' || currentTurn !== 'Player') {
      return;
    }

    // Create new grid state after player's move
    const newGrids = [...grids];
    newGrids[gridIndex] = {
      ...newGrids[gridIndex],
      cells: [...newGrids[gridIndex].cells]
    };
    newGrids[gridIndex].cells[cellIndex] = 'X';

    // Check if this move created a winning pattern (which means the player loses this grid)
    const winPattern = checkForWinningPattern(newGrids[gridIndex].cells);
    if (winPattern) {
      newGrids[gridIndex].isBlocked = true;
      newGrids[gridIndex].winLine = winPattern;

      // Update grids alive state
      const newGridsAlive = [...gridsAlive];
      newGridsAlive[gridIndex] = false;
      setGridsAlive(newGridsAlive);

      // Award XP and coins for blocking a grid
      setXP(XP + 5);
      setCoins(coins + 50);

      // Check if game is over (only one grid left)
      const activeGrids = newGridsAlive.filter(isAlive => isAlive).length;
      if (activeGrids <= 1) {
        setGameOver(true);
        setWinner('Computer'); // Player blocked the second-to-last grid, so Computer wins
        setXP(XP+ 20); // Bonus XP for game completion
        return;
      }
    }

    setGrids(newGrids);
    setCurrentTurn('Computer');

    // Schedule AI move
    setTimeout(() => {
      computerMove(newGrids);
    }, 1000);
  };

  // Computer's move
  const computerMove = (currentGrids: GridState[]) => {
    if (gameOver) return;

    // Find active grids
    const activeGridIndices = gridsAlive.map((isAlive, index) => isAlive ? index : -1).filter(idx => idx !== -1);

    if (activeGridIndices.length === 0) return;

    // Choose a random active grid
    const randomGridIndex = activeGridIndices[Math.floor(Math.random() * activeGridIndices.length)];

    // Find best move for chosen grid
    const bestMoveIndex = findBestMove(randomGridIndex);

    if (bestMoveIndex === -1) return;

    // Make move
    const newGrids = [...currentGrids];
    newGrids[randomGridIndex] = {
      ...newGrids[randomGridIndex],
      cells: [...newGrids[randomGridIndex].cells]
    };
    newGrids[randomGridIndex].cells[bestMoveIndex] = 'X';

    // Check if computer's move blocked a grid
    const winPattern = checkForWinningPattern(newGrids[randomGridIndex].cells);
    if (winPattern) {
      newGrids[randomGridIndex].isBlocked = true;
      newGrids[randomGridIndex].winLine = winPattern;

      // Update grids alive state
      const newGridsAlive = [...gridsAlive];
      newGridsAlive[randomGridIndex] = false;
      setGridsAlive(newGridsAlive);

      // Check if game is over (only one grid left)
      const activeGrids = newGridsAlive.filter(isAlive => isAlive).length;
      if (activeGrids <= 1) {
        setGameOver(true);
        setWinner('Player'); // Computer blocked the second-to-last grid, so Player wins
        setCoins(coins + 100); // Bonus coins for winning
        setXP(XP+ 50); // Bonus XP for winning
      }
    }

    setGrids(newGrids);
    setCurrentTurn('Player');
  };



  const handleGridCellClick = (gridIndex: number, cellIndex: number) => {
    makeMove(gridIndex, cellIndex);
  };

  const handleNameSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (playerName.trim()) {
      setGameStarted(true);
    }
  };

  const toggleSettings = () => {
    setIsSettingsOpen((prev) => !prev);
  };

  const handleResetGame = () => {
    setIsSettingsOpen(false);
    setGrids([
      { cells: Array(9).fill(''), isBlocked: false, winLine: null },
      { cells: Array(9).fill(''), isBlocked: false, winLine: null },
      { cells: Array(9).fill(''), isBlocked: false, winLine: null }
    ]);
    setGridsAlive([true, true, true]);
    setCurrentTurn('Player');
    setGameOver(false);
    setWinner(null);
  };

  const handleSoloSettingsChange = (newSettings: { aiLevel: number; soundOn: boolean }) => {
    setSoloSettings(newSettings);
  };

  const handleUndo = () => {
    // Implement undo logic if needed
    console.log('Undo move');
  };

  const handleSkipMove = () => {
    if (currentTurn === 'Player' && !gameOver) {
      setCurrentTurn('Computer');
      setTimeout(() => {
        computerMove(grids);
      }, 500);
    }
  };

  const handleMainMenu = () => {
    setGameStarted(false);
    handleResetGame();
  };

  return (
    <div className="min-h-screen bg-black text-white font-['VT323'] overflow-hidden relative">
      <AnimatePresence>
        {!gameStarted && (
          <motion.div
            className="fixed inset-0 bg-black z-50 flex items-center justify-center"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-gray-900 p-8 rounded-lg text-center"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
            >
              <h2 className="text-3xl mb-6 text-cyan-400">ENTER YOUR NAME</h2>
              <form onSubmit={handleNameSubmit} className="flex flex-col items-center">
                <input
                  type="text"
                  value={playerName}
                  onChange={(e) => setPlayerName(e.target.value)}
                  className="bg-gray-800 text-white px-4 py-2 rounded mb-4 w-64"
                  placeholder="Cyber Warrior"
                  maxLength={15}
                />
                <motion.button
                  type="submit"
                  className="bg-red-600 text-white px-6 py-2 rounded"
                  whileHover={{ scale: 1.05 }}
                >
                  START GAME
                </motion.button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {gameStarted && (
        <>
          <Navbar onSettingsClick={toggleSettings} />

          <SettingsSolo
            isOpen={isSettingsOpen}
            onClose={toggleSettings}
            initialSettings={soloSettings}
            onSettingsChange={handleSoloSettingsChange}
            onUndo={handleUndo}
            onSkipMove={handleSkipMove}
            onMainMenu={handleMainMenu}
            onReset={handleResetGame}
          />

          <motion.main
            className="container mx-auto px-4 py-16 pt-24 relative"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <motion.div
              className="text-center text-2xl mb-8"
              key={currentTurn}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {currentTurn}'s Turn
              {gameOver && winner && (
                <div className="mt-2 text-green-400">
                  {winner === 'Player' ? `${playerName} Wins!` : 'Computer Wins!'}
                </div>
              )}
            </motion.div>

            {/* Top bar with gold coins and XP icons */}
            <div className="absolute top-0 left-0 right-0 flex justify-between p-4 text-xl">
              <div className="flex items-center">
                {/* Gold coin icon */}
                <svg
                  className="w-6 h-6 mr-2"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle cx="12" cy="12" r="10" fill="#FFD700" />
                  <circle cx="12" cy="12" r="8" fill="#FFDF00" />
                  <text x="12" y="16" textAnchor="middle" fill="#D4AF37" fontSize="14" fontWeight="bold">$</text>
                </svg>
                <span className="text-yellow-400">: {coins}</span>
              </div>
              <div className="flex items-center">
                {/* Gold XP icon */}
                <svg
                  className="w-6 h-6 mr-2"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <polygon
                    points="12,2 15.5,9 23,9 17,14 19,22 12,17.5 5,22 7,14 1,9 8.5,9"
                    fill="#FFD700"
                    stroke="#D4AF37"
                    strokeWidth="1"
                  />
                  <text x="12" y="14" textAnchor="middle" fill="#D4AF37" fontSize="6" fontWeight="bold">XP</text>
                </svg>
                <span className="text-yellow-400">{XP} XP</span>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              {grids.map((grid, index) => (
                <GameGrid
                  key={index}
                  gridIndex={index}
                  onCellClick={handleGridCellClick}
                  disabled={!gridsAlive[index] || currentTurn === 'Computer' || gameOver}
                  cells={grid.cells}
                  isBlocked={grid.isBlocked}
                  winLine={grid.winLine}
                />
              ))}
            </div>
          </motion.main>
        </>
      )}
    </div>
  );
};

export default GamePageSolo;