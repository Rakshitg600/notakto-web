import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '../components/Navbar';
import GameGrid from '../components/GameGrid';
import SettingsModal from '../components/SettingsModal';

const GamePageDuo: React.FC = () => {
  const [player1Name, setPlayer1Name] = useState('');
  const [player2Name, setPlayer2Name] = useState('');
  const [gameStarted, setGameStarted] = useState(false);
  const [currentTurn, setCurrentTurn] = useState('Player 1');
  const [gridsAlive] = useState([true, true, true]);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [sound, setSound] = useState(true);

  const handleGridCellClick = () => {
    setCurrentTurn(currentTurn === player1Name ? player2Name : player1Name);
  };

  const handleNameSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (player1Name.trim() && player2Name.trim()) {
      setGameStarted(true);
    }
  };

  const toggleSettings = () => {
    setIsSettingsOpen(!isSettingsOpen);
  };

  const handleResetGame = () => {
    setIsSettingsOpen(false);
    setGameStarted(false);
    setPlayer1Name('');
    setPlayer2Name('');
    setCurrentTurn('Player 1');
  };

  const toggleSound = () => setSound((prev) => !prev);

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Navbar 
        onSettingsToggle={toggleSettings} 
        onResetGame={handleResetGame} 
        soundEnabled={sound}
        onSoundToggle={toggleSound}
      />

      {!gameStarted && (
        <div className="flex flex-col items-center justify-center h-screen">
          <h2 className="text-2xl mb-6">ENTER PLAYER NAMES</h2>
          <form onSubmit={handleNameSubmit} className="flex flex-col space-y-4">
            <input
              type="text"
              value={player1Name}
              onChange={(e) => setPlayer1Name(e.target.value)}
              className="bg-gray-800 text-white px-4 py-2 rounded mb-4 w-64"
              placeholder="Player 1 Name"
              maxLength={15}
              required
            />
            <input
              type="text"
              value={player2Name}
              onChange={(e) => setPlayer2Name(e.target.value)}
              className="bg-gray-800 text-white px-4 py-2 rounded mb-4 w-64"
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
      )}

      {gameStarted && (
        <div className="container mx-auto px-4 py-8">
          {/* Turn Indicator */}
          <div className="text-center text-xl mb-6">
            {currentTurn}'s Turn
          </div>

          {/* Game Grids */}
          <div className="grid grid-cols-3 gap-4">
            {gridsAlive.map((isAlive, index) => (
              isAlive && (
                <GameGrid 
                  key={index} 
                  onCellClick={handleGridCellClick}
                  playerName={currentTurn}
                />
              )
            ))}
          </div>
        </div>
      )}

      <AnimatePresence>
        {isSettingsOpen && (
          <SettingsModal 
            onClose={toggleSettings}
            soundEnabled={sound}
            onSoundToggle={toggleSound}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default GamePageDuo;