import React from "react";
import PropTypes from "prop-types";
import { motion, AnimatePresence } from "framer-motion";

const WinnerModal = ({ visible, winner, onPlayAgain, onMenu }) => {
  if (!visible) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="bg-gray-900 border-2 border-cyan-500/50 rounded-lg p-6 w-full max-w-md mx-4 relative"
          initial={{ scale: 0.9, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.9, y: 20 }}
        >
          {/* Victory sparkles animation */}
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-cyan-400"
                initial={{
                  x: "50%",
                  y: "50%",
                  scale: 0,
                  opacity: 1,
                }}
                animate={{
                  x: `${Math.random() * 100}%`,
                  y: `${Math.random() * 100}%`,
                  scale: [0, 1, 0],
                  opacity: [1, 1, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.1,
                  ease: "easeOut",
                }}
              />
            ))}
          </div>

          {/* Title with glow effect */}
          <motion.h3
            className="text-cyan-400 text-3xl mb-4 font-['VT323'] text-center tracking-widest"
            initial={{ y: -20 }}
            animate={{ y: 0 }}
          >
            Game Over!
          </motion.h3>

          {/* Winner text with special effects */}
          <motion.div
            className="text-2xl mb-8 font-['VT323'] text-center"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <span className="bg-gradient-to-r from-cyan-400 via-white to-cyan-400 text-transparent bg-clip-text">
              {winner === "You" ? "You won!" : `${winner} wins`}
            </span>
          </motion.div>

          {/* Buttons container */}
          <div className="grid grid-cols-2 gap-4">
            <motion.button
              className="p-3 bg-cyan-600 text-white rounded font-['VT323'] text-xl
                       relative overflow-hidden group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onPlayAgain}
            >
              <span className="relative z-10">Play Again</span>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-cyan-700 opacity-0 
                         transition-opacity group-hover:opacity-100"
                initial={false}
                whileHover={{ opacity: 1 }}
              />
            </motion.button>

            <motion.button
              className="p-3 bg-gray-700 text-white rounded font-['VT323'] text-xl
                       relative overflow-hidden group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onMenu}
            >
              <span className="relative z-10">Main Menu</span>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-gray-600 to-gray-800 opacity-0 
                         transition-opacity group-hover:opacity-100"
                initial={false}
                whileHover={{ opacity: 1 }}
              />
            </motion.button>
          </div>

          {/* Decorative Corner Elements */}
          <div className="absolute top-2 left-2 w-2 h-2 bg-cyan-500 opacity-50"></div>
          <div className="absolute top-2 right-2 w-2 h-2 bg-cyan-500 opacity-50"></div>
          <div className="absolute bottom-2 left-2 w-2 h-2 bg-cyan-500 opacity-50"></div>
          <div className="absolute bottom-2 right-2 w-2 h-2 bg-cyan-500 opacity-50"></div>

          {/* Glow effect around the modal */}
          <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 to-cyan-700 opacity-20 blur-sm -z-10 rounded-lg"></div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

WinnerModal.propTypes = {
  visible: PropTypes.bool.isRequired,
  winner: PropTypes.string.isRequired,
  onPlayAgain: PropTypes.func.isRequired,
  onMenu: PropTypes.func.isRequired,
};

export default WinnerModal;
