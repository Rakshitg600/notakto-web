import React from "react";
import PropTypes from "prop-types";
import { motion, AnimatePresence } from "framer-motion";

const DifficultyModal = ({ visible, onSelect, onClose }) => {
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
          <h3 className="text-cyan-400 text-2xl mb-6 font-['VT323'] text-center">
            Select Difficulty
          </h3>

          <div className="space-y-3">
            {[1, 2, 3, 4, 5].map((level) => (
              <motion.button
                key={level}
                className="w-full p-4 rounded bg-gray-800 hover:bg-cyan-600 border border-cyan-700 
                         text-gray-300 hover:text-white transition-colors font-['VT323'] text-xl
                         relative overflow-hidden group"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => onSelect(level)}
              >
                <span className="relative z-10">Level {level}</span>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-cyan-600 to-cyan-800 opacity-0 
                           transition-opacity group-hover:opacity-100"
                  initial={false}
                  animate={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                />

                {/* Decorative elements */}
                <div className="absolute top-2 left-2 w-1 h-1 bg-cyan-500 opacity-50"></div>
                <div className="absolute bottom-2 right-2 w-1 h-1 bg-cyan-500 opacity-50"></div>
              </motion.button>
            ))}
          </div>

          <motion.button
            className="w-full mt-6 p-3 bg-gray-700 hover:bg-gray-600 text-gray-300 
                     rounded font-['VT323'] text-lg border border-gray-600"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onClose}
          >
            Cancel
          </motion.button>

          {/* Decorative Corner Elements */}
          <div className="absolute top-2 left-2 w-2 h-2 bg-cyan-500 opacity-50"></div>
          <div className="absolute top-2 right-2 w-2 h-2 bg-cyan-500 opacity-50"></div>
          <div className="absolute bottom-2 left-2 w-2 h-2 bg-cyan-500 opacity-50"></div>
          <div className="absolute bottom-2 right-2 w-2 h-2 bg-cyan-500 opacity-50"></div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

DifficultyModal.propTypes = {
  visible: PropTypes.bool.isRequired,
  onSelect: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default DifficultyModal;
