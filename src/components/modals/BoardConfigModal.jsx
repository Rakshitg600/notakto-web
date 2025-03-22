import React, { useState } from "react";
import PropTypes from "prop-types";
import { motion, AnimatePresence } from "framer-motion";
import { BOARD_SIZES, BOARD_COUNTS } from "../../constants/boardConfig";

const BoardConfigModal = ({
  visible,
  currentBoards,
  currentSize,
  onConfirm,
  onCancel,
}) => {
  const [selectedBoards, setSelectedBoards] = useState(currentBoards);
  const [selectedSize, setSelectedSize] = useState(currentSize);

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
          {/* Number of Boards Section */}
          <div className="mb-6">
            <h3 className="text-cyan-400 text-xl mb-3 font-['VT323']">
              Number of Boards
            </h3>
            <div className="grid grid-cols-5 gap-2">
              {BOARD_COUNTS.map((num) => (
                <button
                  key={num}
                  className={`p-3 rounded border ${
                    selectedBoards === num
                      ? "bg-cyan-600 border-cyan-400 text-white"
                      : "bg-gray-800 border-gray-700 text-gray-300 hover:bg-gray-700"
                  } transition-colors font-['VT323'] text-lg`}
                  onClick={() => setSelectedBoards(num)}
                >
                  {num}
                </button>
              ))}
            </div>
          </div>

          {/* Board Size Section */}
          <div className="mb-8">
            <h3 className="text-cyan-400 text-xl mb-3 font-['VT323']">
              Board Size
            </h3>
            <div className="grid grid-cols-4 gap-2">
              {BOARD_SIZES.map((size) => (
                <button
                  key={size}
                  className={`p-3 rounded border ${
                    selectedSize === size
                      ? "bg-cyan-600 border-cyan-400 text-white"
                      : "bg-gray-800 border-gray-700 text-gray-300 hover:bg-gray-700"
                  } transition-colors font-['VT323'] text-lg`}
                  onClick={() => setSelectedSize(size)}
                >
                  {size}x{size}
                </button>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-4">
            <motion.button
              className="px-6 py-2 bg-gray-700 text-gray-300 rounded hover:bg-gray-600 font-['VT323'] text-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onCancel}
            >
              Cancel
            </motion.button>
            <motion.button
              className="px-6 py-2 bg-cyan-600 text-white rounded hover:bg-cyan-500 font-['VT323'] text-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onConfirm(selectedBoards, selectedSize)}
            >
              Apply
            </motion.button>
          </div>

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

BoardConfigModal.propTypes = {
  visible: PropTypes.bool.isRequired,
  currentBoards: PropTypes.number.isRequired,
  currentSize: PropTypes.number.isRequired,
  onConfirm: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

export default BoardConfigModal;
