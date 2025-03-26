import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import Navbar from '../components/Navbar';
import SettingsModal from '../components/SettingsModal';
import GameGrid from '../components/GameGrid';

// Winning patterns
const WINNING_PATTERNS = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
];

const GamePageDuo: React.FC = () => {
  // Game state management
  const [playerNames, setPlayerNames] = useState({
    player1: '',
    player2: ''
  });
  const [gameStarted, setGameStarted] = useState(false);
  const [isPlayerTurn, setIsPlayerTurn] = useState(true);
  const [blockedGrids, setBlockedGrids] = useState({
    grid1: false,
    grid2: false,
    grid3: false
  });
  const [isGameOver, setIsGameOver] = useState(false);
  const [lastMoveBy, setLastMoveBy] = useState<string | null>(null);

  // Grid state management
  const [gridStates, setGridStates] = useState({
    grid1: Array(9).fill(''),
    grid2: Array(9).fill(''),
    grid3: Array(9).fill('')
  });

  // Modal and settings state
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [sound, setSound] = useState(true);

  // Check for winning pattern in a grid
  const checkWinningPattern = (gridCells: string[]) => {
    return WINNING_PATTERNS.some(pattern => {
      const [a, b, c] = pattern;
      return gridCells[a] && 
             gridCells[a] === gridCells[b] && 
             gridCells[b] === gridCells[c];
    });
  };

  // Handle cell click in a specific grid
  const handleCellClick = (gridIndex: number, cellIndex: number) => {
    const gridKey = `grid${gridIndex + 1}` as keyof typeof gridStates;

    // Prevent moves if game is over or grid is blocked
    if (blockedGrids[gridKey] || isGameOver) return;

    // Create a copy of current grid states
    const newGridStates = {...gridStates};
    const currentGrid = [...newGridStates[gridKey]];

    // Check if this move is valid
    if (currentGrid[cellIndex]) return;

    // Check if the cell is already marked
    currentGrid[cellIndex] = 'X';
    newGridStates[gridKey] = currentGrid;

    // Update grid states
    setGridStates(newGridStates);

    // Check if this move blocks the grid
    if (checkWinningPattern(currentGrid)) {
      const newBlockedGrids = {...blockedGrids, [gridKey]: true};
      setBlockedGrids(newBlockedGrids);

      // Check total blocked grids
      const blockedCount = Object.values(newBlockedGrids).filter(Boolean).length;

      // Update last move
      setLastMoveBy(isPlayerTurn ? 'player1' : 'player2');

      // Check if game is over (all grids blocked)
      if (blockedCount === 3) {
        handleGameOver();
        return;
      }
    }

    // Toggle turn
    setIsPlayerTurn(!isPlayerTurn);
  };

  // Handle game over condition
  const handleGameOver = () => {
    setIsGameOver(true);
  };

  // Handle name submission
  const handleNameSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const player1 = (document.getElementById('player1-name') as HTMLInputElement).value.trim();
    const player2 = (document.getElementById('player2-name') as HTMLInputElement).value.trim();
    
    if (player1 && player2) {
      setPlayerNames({ player1, player2 });
      setGameStarted(true);
      setIsPlayerTurn(true);
    }
  };

  // Reset game
  const handleResetGame = () => {
    setPlayerNames({ player1: '', player2: '' });
    setGameStarted(false);
    setIsPlayerTurn(true);
    setBlockedGrids({
      grid1: false,
      grid2: false,
      grid3: false
    });
    setIsGameOver(false);
    setLastMoveBy(null);
    setGridStates({
      grid1: Array(9).fill(''),
      grid2: Array(9).fill(''),
      grid3: Array(9).fill('')
    });
    setIsSettingsOpen(false);
  };

  // Toggle settings
  const toggleSettings = () => {
    setIsSettingsOpen(!isSettingsOpen);
  };

  // Toggle sound
  const toggleSound = () => setSound(prev => !prev);

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Navbar onSettingsClick={toggleSettings} />

      {!gameStarted && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="names-modal bg-gray-800 p-8 rounded-lg">
            <h2 className="text-2xl mb-6 text-center">ENTER PLAYER NAMES</h2>
            <form onSubmit={handleNameSubmit} className="flex flex-col space-y-4">
              <input
                id="player1-name"
                type="text"
                className="bg-gray-700 text-white px-4 py-2 rounded"
                placeholder="Player 1 Name"
                maxLength={15}
                required
              />
              <input
                id="player2-name"
                type="text"
                className="bg-gray-700 text-white px-4 py-2 rounded"
                placeholder="Player 2 Name"
                maxLength={15}
                required
              />
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                START GAME
              </button>
            </form>
          </div>
        </div>
      )}

      {gameStarted && !isGameOver && (
        <div className="container mx-auto px-4 py-8">
          <div className="text-center text-xl mb-6 current-player">
            {isPlayerTurn ? `${playerNames.player1}'s Turn` : `${playerNames.player2}'s Turn`}
          </div>

          <div className="grid grid-cols-3 gap-4">
            {[0, 1, 2].map(gridIndex => (
              <GameGrid 
                key={gridIndex}
                gridIndex={gridIndex}
                onCellClick={handleCellClick}
                disabled={blockedGrids[`grid${gridIndex + 1}` as keyof typeof blockedGrids]}
              />
            ))}
          </div>
        </div>
      )}

      {isGameOver && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="winner-modal bg-gray-800 p-8 rounded-lg text-center">
            <h2 className="winner-message text-3xl mb-4">
              {lastMoveBy === 'player1' 
                ? `${playerNames.player2} Won` 
                : `${playerNames.player1} Won`}
            </h2>
            <button 
              className="confirm-win bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={handleResetGame}
            >
              Play Again
            </button>
          </div>
        </div>
      )}

      <AnimatePresence>
        {isSettingsOpen && (
          <SettingsModal
            isOpen={isSettingsOpen}
            onClose={toggleSettings}
            onResetGame={handleResetGame}
            soundEnabled={sound}
            onSoundToggle={toggleSound}
            toggleSound={toggleSound}
            gameMode="duo"
            onGameModeChange={() => {}}
            sound={sound}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default GamePageDuo;