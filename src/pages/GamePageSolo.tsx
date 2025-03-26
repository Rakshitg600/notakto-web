import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import GameGrid from '../components/GameGrid';
import SettingsSolo from '../components/SettingsSolo';
import { 
  onAuthStateChangedListener, 
  saveEconomyToFirestore, 
  loadEconomyFromFirestore,
} from '../constants/firebase';

const GamePageSolo: React.FC = () => {
  const [playerName, setPlayerName] = useState('');
  const [gameStarted, setGameStarted] = useState(false);
  const [currentTurn, setCurrentTurn] = useState('Player');
  const [gridsAlive] = useState([true, true, true]);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);

  // Add state for coins and XP
  const [coins, setCoins] = useState(1000);
  const [xp, setXp] = useState(0);

  // Solo settings state
  const [soloSettings, setSoloSettings] = useState({
    aiLevel: 1,
    soundOn: true,
  });
  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener(async (user:any) => {
      if (user) {
        setUserId(user.uid);
        const data = await loadEconomyFromFirestore(user.uid);
        setCoins(data.coins);
        setXp(data.experience);
      }
    });
    return () => unsubscribe();
  }, []);
  useEffect(() => {
    if (userId && gameStarted) {
      const saveData = setTimeout(() => {
        saveEconomyToFirestore(userId, coins, xp);
      }, 500);
      return () => clearTimeout(saveData);
    }
  }, [coins, xp, userId, gameStarted]);
  const handleGridCellClick = () => {
    setCurrentTurn(currentTurn === 'Player' ? 'Computer' : 'Player');
    
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
    
  };

  const handleSoloSettingsChange = (newSettings: { aiLevel: number; soundOn: boolean }) => {
    setSoloSettings(newSettings);
  };

  const handleUndo = () => {
    console.log('Undo move');
  };

  const handleSkipMove = () => {
    console.log('Skip move');
  };

  const handleMainMenu = () => {
    setGameStarted(false);
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
            </motion.div>
            {/* Top bar with coins and XP */}
          <div className="absolute top-0 left-0 right-0 flex justify-between p-4 text-xl">
            <div className="flex items-center">
              <img 
                src="/coin-icon.png" 
                className="w-6 h-6 mr-2" 
              />
              <span>:  {coins}</span>
            </div>
            <div className="flex items-center">
              <img 
                src="/xp-icon.png" 
                className="w-6 h-6 mr-2" 
              />
              <span>{xp} XP</span>
            </div>
          </div>
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

export default GamePageSolo;