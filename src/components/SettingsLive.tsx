import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface SettingsLiveProps {
  isOpen: boolean;
  onClose: () => void;
  initialSettings?: {
    aiLevel: number;
    soundOn: boolean;
  };
  onSettingsChange?: (settings: { aiLevel: number; soundOn: boolean }) => void;
}

const SettingsLive: React.FC<SettingsLiveProps> = ({
  isOpen, 
  onClose, 
  initialSettings = { aiLevel: 1, soundOn: true },
  onSettingsChange
}) => {
  const [aiLevel, setAiLevel] = useState(initialSettings.aiLevel);
  const [soundOn, setSoundOn] = useState(initialSettings.soundOn);

  const handleSave = () => {
    onSettingsChange?.({ aiLevel, soundOn });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div 
        className="fixed inset-0 bg-black/90 z-[100] flex items-center justify-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div 
          className="bg-blue-700 border-4 border-cyan-400 rounded-lg p-6 w-full max-w-md"
          initial={{ scale: 0.9, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <h2 className="text-4xl text-white font-['VT323'] text-center mb-6">Game Configuration</h2>

          {/* AI Level */}
          <div className="mb-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-2xl text-white font-['VT323']">AI Level</span>
              <span className="text-2xl text-white font-['VT323']">{aiLevel}</span>
            </div>
            <label htmlFor="aiLevelRange" className="sr-only">Adjust AI Level</label>
            <input 
              id="aiLevelRange"
              type="range" 
              min="1" 
              max="5" 
              value={aiLevel}
              onChange={(e) => setAiLevel(Number(e.target.value))}
              className="w-full h-2 bg-cyan-400 rounded-lg appearance-none cursor-pointer"
            />
          </div>

          {/* Sound Toggle */}
          <div className="flex justify-between items-center mb-6">
            <span className="text-2xl text-white font-['VT323']">Sound</span>
            <button 
              onClick={() => setSoundOn(!soundOn)}
              title={soundOn ? 'Turn sound off' : 'Turn sound on'}
              className={`w-16 h-8 rounded-full ${
                soundOn ? 'bg-green-500' : 'bg-red-500'
              } relative transition-colors duration-300`}
            >
              <span 
                className={`absolute top-1/2 -translate-y-1/2 w-6 h-6 bg-white rounded-full transition-transform duration-300 ${
                  soundOn ? 'right-1' : 'left-1'
                }`} 
              />
            </button>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-4">
            <button 
              onClick={handleSave}
              className="flex-1 bg-cyan-400 text-black text-2xl font-['VT323'] py-2 rounded-lg hover:bg-cyan-300 transition-colors"
            >
              Save
            </button>
            <button 
              onClick={onClose}
              className="flex-1 bg-red-500 text-white text-2xl font-['VT323'] py-2 rounded-lg hover:bg-red-400 transition-colors"
            >
              Cancel
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default SettingsLive;
