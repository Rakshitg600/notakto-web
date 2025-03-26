import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface SettingsSoloProps {
  isOpen: boolean;
  onClose: () => void;
  initialSettings?: {
    aiLevel: number;
    soundOn: boolean;
  };
  coins?: number;
  onSettingsChange?: (settings: { aiLevel: number; soundOn: boolean }) => void;
  onUndo?: () => void;
  onSkipMove?: () => void;
  onBuyCoins?: () => void;
  onReset?: () => void;
  onMainMenu?: () => void;
}

const SettingsSolo: React.FC<SettingsSoloProps> = ({
  isOpen, 
  onClose, 
  initialSettings = { aiLevel: 1, soundOn: true },
  coins = 9805,
  onSettingsChange,
  onUndo,
  onSkipMove,
  onBuyCoins,
  onReset,
  onMainMenu
}) => {
  const [aiLevel, setAiLevel] = useState(initialSettings.aiLevel);
  const [soundOn, setSoundOn] = useState(initialSettings.soundOn);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div 
        className="fixed inset-0 bg-black z-[100] flex items-center justify-center p-4 font-mono text-white"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <div className="w-full max-w-md bg-blue-900 border-2 border-blue-700">
          {/* Header */}
          <div className="bg-blue-900 text-white text-2xl text-center py-2 border-b border-blue-700">
            Game Configuration
          </div>

          {/* Menu Items */}
          <div className="divide-y divide-blue-700">
            {[
              { label: 'Undo (100 coins)', onClick: onUndo },
              { label: 'Skip a Move (200 coins)', onClick: onSkipMove },
              { label: 'Buy Coins (100)', onClick: onBuyCoins },
              { label: 'Reset', onClick: onReset },
              { 
                label: `AI Level: ${aiLevel}`, 
                onClick: () => {
                  const nextLevel = aiLevel === 5 ? 1 : aiLevel + 1;
                  setAiLevel(nextLevel);
                  onSettingsChange?.({ aiLevel: nextLevel, soundOn });
                }
              },
              { 
                label: `Sound: ${soundOn ? 'On' : 'Off'}`, 
                onClick: () => {
                  const newSoundOn = !soundOn;
                  setSoundOn(newSoundOn);
                  onSettingsChange?.({ aiLevel, soundOn: newSoundOn });
                }
              },
              { label: 'Main Menu', onClick: onMainMenu },
              { label: 'Return to Game', onClick: onClose }
            ].map((item, index) => (
              <button
                key={index}
                onClick={item.onClick}
                className="w-full text-left px-4 py-2 hover:bg-blue-800 transition-colors text-2xl"
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Footer */}
          <div className="bg-blue-950 text-white text-2xl text-center py-2">
            Coins: {coins} | XP: 1685
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default SettingsSolo;