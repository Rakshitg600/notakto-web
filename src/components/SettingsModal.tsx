import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onResetGame: () => void;
  soundEnabled: boolean;
  toggleSound: () => void;
  gameMode: 'solo' | 'duo';
  onGameModeChange: (mode: 'solo' | 'duo') => void;
  sound: boolean;
  onSoundToggle: () => void;
}

const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen, 
  onClose, 
  gameMode, 
  onGameModeChange,
  sound,
  onSoundToggle
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          className="fixed inset-0 bg-black/80 z-[100] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div 
            className="bg-gray-900 border border-cyan-900/50 rounded-lg p-8 w-full max-w-md text-white font-['VT323']"
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
          >
            <h2 className="text-3xl text-center text-cyan-400 mb-6">GAME SETTINGS</h2>

            {/* Game Mode Selection */}
            <div className="mb-6">
              <label className="block text-xl mb-2 text-cyan-500">Game Mode</label>
              <div className="flex space-x-4">
                {['solo', 'duo'].map((mode) => (
                  <motion.button
                    key={mode}
                    className={`flex-1 py-2 rounded text-xl transition-colors 
                      ${gameMode === mode 
                        ? 'bg-cyan-600 text-white' 
                        : 'bg-gray-800 text-gray-400 hover:bg-gray-700'}`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => onGameModeChange(mode as 'solo' | 'duo')}
                  >
                    {mode.charAt(0).toUpperCase() + mode.slice(1)}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Sound Toggle */}
            <div className="mb-6">
              <label className="block text-xl mb-2 text-cyan-500">Sound</label>
              <motion.button
  className={`w-full py-2 rounded text-xl transition-colors ${
    sound ? 'bg-green-600 text-white' : 'bg-red-600 text-white'
  }`}
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
  onClick={onSoundToggle} // This toggles sound
>
  {sound ? 'ON' : 'OFF'}
</motion.button>
            </div>

            {/* Button Row */}
            <div className="flex space-x-4 mt-8">
              <motion.button
                className="flex-1 bg-red-600 text-white py-2 rounded"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  // Reset game settings logic could go here
                  onClose();
                }}
              >
                Reset
              </motion.button>
              <motion.button
                className="flex-1 bg-cyan-600 text-white py-2 rounded"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onClose}
              >
                Close
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SettingsModal;