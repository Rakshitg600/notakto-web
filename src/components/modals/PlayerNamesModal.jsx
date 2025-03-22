import React, { useState } from "react";
import PropTypes from "prop-types";
import { motion, AnimatePresence } from "framer-motion";

const PlayerNamesModal = ({
  visible,
  onSubmit,
  initialNames = ["Player 1", "Player 2"],
}) => {
  const [player1, setPlayer1] = useState(initialNames[0]);
  const [player2, setPlayer2] = useState(initialNames[1]);
  const [error, setError] = useState("");

  const handleSubmit = () => {
    if (player1.trim().toLowerCase() === player2.trim().toLowerCase()) {
      setError("Player 1 and Player 2 cannot have the same name.");
      return;
    }
    setError("");
    onSubmit(player1 || "Player 1", player2 || "Player 2");
  };

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
            Enter Player Names
          </h3>

          {error && (
            <motion.div
              className="bg-red-900/50 border border-red-500 text-red-200 p-3 rounded mb-4 text-sm"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {error}
            </motion.div>
          )}

          <div className="space-y-4">
            <div className="group">
              <input
                type="text"
                value={player1}
                onChange={(e) => setPlayer1(e.target.value)}
                placeholder="Player 1 Name"
                className="w-full p-3 bg-gray-800 border border-cyan-700 rounded text-white 
                         placeholder-gray-500 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400
                         outline-none transition-all font-['VT323'] text-xl"
              />
              <div className="h-0.5 w-0 group-focus-within:w-full bg-cyan-500 transition-all duration-300"></div>
            </div>

            <div className="group">
              <input
                type="text"
                value={player2}
                onChange={(e) => setPlayer2(e.target.value)}
                placeholder="Player 2 Name"
                className="w-full p-3 bg-gray-800 border border-cyan-700 rounded text-white 
                         placeholder-gray-500 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400
                         outline-none transition-all font-['VT323'] text-xl"
              />
              <div className="h-0.5 w-0 group-focus-within:w-full bg-cyan-500 transition-all duration-300"></div>
            </div>
          </div>

          <motion.button
            className="w-full mt-6 p-4 bg-cyan-600 text-white rounded font-['VT323'] text-xl
                     hover:bg-cyan-500 transition-colors relative overflow-hidden group"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleSubmit}
          >
            <span className="relative z-10">Start Game</span>
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-cyan-700 opacity-0 
                       transition-opacity group-hover:opacity-100"
              initial={false}
              animate={{ opacity: 0 }}
              whileHover={{ opacity: 1 }}
            />
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

PlayerNamesModal.propTypes = {
  visible: PropTypes.bool.isRequired,
  onSubmit: PropTypes.func.isRequired,
  initialNames: PropTypes.arrayOf(PropTypes.string),
};

export default PlayerNamesModal;
