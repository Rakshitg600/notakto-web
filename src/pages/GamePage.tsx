import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '../components/Navbar';
import GameGrid from '../components/GameGrid';
import SettingsModal from '../components/SettingsModal';
import chiptune from '../assets/button-sound.mp3';

const GamePage: React.FC = () => {
  const [playerName, setPlayerName] = useState('');
  const [gameStarted, setGameStarted] = useState(false);
  const [gameMode, setGameMode] = useState<'solo' | 'duo'>('solo');
  const [coins] = useState(1000);
  const [xp] = useState(0);
  const [currentTurn, setCurrentTurn] = useState('Player');
  const [gridsAlive] = useState([true, true, true]);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [sound, setSound] = useState(true);
  const [soundEnabled] = useState(true);


  const handleGridCellClick = () => {
    // Basic turn switching and grid management logic
    // You'll implement more complex game logic here
    setCurrentTurn(currentTurn === 'Player' ? 'Computer' : 'Player');
  };

  const handleNameSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (playerName.trim()) {
      setGameStarted(true);
    }
  };

  const toggleSettings = () => {
    setIsSettingsOpen(!isSettingsOpen);
  };

  const handleResetGame = () => {
    // Implement game reset logic
    setIsSettingsOpen(false);
  };

  const toggleSound = () => setSound((prev) => !prev);

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

         <SettingsModal 
            isOpen={isSettingsOpen}
            onClose={toggleSettings}
            onResetGame={handleResetGame}
            soundEnabled={soundEnabled}
            toggleSound={toggleSound}
            gameMode={gameMode}
            onGameModeChange={(mode) => setGameMode(mode)}
            sound={sound}
            onSoundToggle={toggleSound}
          />
          
          <motion.main 
            className="container mx-auto px-4 py-16 pt-24 relative"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {/* Game Stats */}
            <div className="flex justify-between mb-8 text-xl">
              <div>
                <span className="text-yellow-500">💰 {coins}</span>
                <span className="ml-4 text-cyan-500">⚡ {xp} XP</span>
              </div>
              <div className="flex items-center space-x-4">
                <span>Mode:</span>
                <label htmlFor="gameMode" className="sr-only">Select Game Mode</label>
                <select 
                  id="gameMode"
                  value={gameMode}
                  onChange={(e) => setGameMode(e.target.value as 'solo' | 'duo')}
                  className="bg-gray-800 text-white px-2 py-1 rounded"
                >
                  <option value="solo">Solo</option>
                  <option value="duo">Duo</option>
                </select>
              </div>
            </div>

            {/* Turn Indicator */}
            <motion.div 
              className="text-center text-2xl mb-8"
              key={currentTurn}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {currentTurn}'s Turn | $7.7's Game
            </motion.div>

            {/* Game Grids */}
            <div className="grid grid-cols-3 gap-4">
              {gridsAlive.map((isAlive, index) => (
                <GameGrid 
                  key={index} 
                  gridIndex={index}
                  onCellClick={handleGridCellClick}
                  disabled={!isAlive || currentTurn === 'Computer'}
                />
              ))}
            </div>
          </motion.main>
        </>
      )}
    </div>
  );
};

export default GamePage;