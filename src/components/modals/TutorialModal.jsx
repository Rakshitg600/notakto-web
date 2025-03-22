import React from "react";
import PropTypes from "prop-types";
import { motion, AnimatePresence } from "framer-motion";

const TutorialModal = ({ visible, onClose }) => {
  if (!visible) return null;

  const rules = [
    "Both players use X marks",
    "Game is played on three 3x3 boards",
    "Players alternate placing Xs",
    "Any board with 3 Xs in a row becomes dead",
    "Last player to make a valid move loses",
    "Strategy: Force opponent to make final move!",
  ];

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
          {/* Title with glow effect */}
          <h3
            className="text-cyan-400 text-3xl mb-8 font-['VT323'] text-center tracking-widest 
                  relative z-10 bg-clip-text bg-gradient-to-r 
                  from-cyan-400 via-white to-cyan-400"
          >
            How to Play Notakto
          </h3>

          {/* Rules list with animations */}
          <div className="space-y-4 mb-8">
            {rules.map((rule, index) => (
              <motion.div
                key={index}
                className="flex items-start space-x-3 text-gray-300"
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
              >
                <span className="text-cyan-500 font-['VT323'] text-xl">•</span>
                <span className="font-['VT323'] text-lg leading-tight">
                  {rule}
                </span>
              </motion.div>
            ))}
          </div>

          {/* Close button with hover effect */}
          <motion.button
            onClick={onClose}
            className="w-full p-3 bg-cyan-600 text-white rounded font-['VT323'] text-xl
                     relative overflow-hidden group"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="relative z-10">Close Tutorial</span>
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-cyan-700 opacity-0 
                       transition-opacity group-hover:opacity-100"
              initial={false}
              animate={{ opacity: 0 }}
              whileHover={{ opacity: 1 }}
            />
          </motion.button>

          {/* Background decorative pattern */}
          <div className="absolute inset-0 opacity-5 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCI+PHJlY3QgeD0iMCIgeT0iMCIgd2lkdGg9IjEwIiBoZWlnaHQ9IjEwIiBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9IjAuMSIvPjwvc3ZnPg==')]"></div>

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

TutorialModal.propTypes = {
  visible: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default TutorialModal;
