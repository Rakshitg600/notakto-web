import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '../components/Navbar';

const GamePage = () => {
  // Game state
  const [playerName, setPlayerName] = useState('');
  const [nameInput, setNameInput] = useState('');
  const [loaded, setLoaded] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [currentPlayer, setCurrentPlayer] = useState('Player'); // 'Player' or 'Computer'
  const [gameMode, setGameMode] = useState('computer'); // 'computer', 'solo', or 'duo'
  const [showModeDropdown, setShowModeDropdown] = useState(false);
  
  // Player stats
  const [stats, setStats] = useState({
    coins: 85,
    xp: 347,
    dollars: 12,
  });
  
  // Game boards (3 grids)
  const [boards, setBoards] = useState([
    Array(9).fill(null),
    Array(9).fill(null),
    Array(9).fill(null),
  ]);
  
  // Track which boards are "dead" (contain three X's in a row)
  const [deadBoards, setDeadBoards] = useState([false, false, false]);
  
  // Handle name input submission
  const handleNameSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (nameInput.trim()) {
      setPlayerName(nameInput.trim());
      setLoaded(true);
      
      // Simulate game loading after name is entered
      setTimeout(() => {
        setGameStarted(true);
      }, 1500);
    }
  };
  
  // Handle board click
  const handleBoardClick = (boardIndex: number, cellIndex: number) => {
    if (!gameStarted || deadBoards[boardIndex] || boards[boardIndex][cellIndex]) {
      return;
    }
    
    // Clone the boards to make updates
    const newBoards = [...boards];
    const boardCopy = [...newBoards[boardIndex]];
    boardCopy[cellIndex] = 'X';
    newBoards[boardIndex] = boardCopy;
    setBoards(newBoards);
    
    // Check if the move created a "dead" board
    checkDeadBoard(boardIndex, newBoards);
    
    // Switch player turn
    setCurrentPlayer(currentPlayer === 'Player' ? 'Computer' : 'Player');
    
    // If playing against computer, make computer move
    if (gameMode === 'computer' && currentPlayer === 'Player') {
      setTimeout(makeComputerMove, 1000);
    }
  };
  
  // Computer makes a move
  const makeComputerMove = () => {
    // Find all valid boards and positions
    const validMoves: { boardIndex: number; cellIndex: number }[] = [];
    boards.forEach((board, boardIndex) => {
      if (!deadBoards[boardIndex]) {
        board.forEach((cell, cellIndex) => {
          if (!cell) {
            validMoves.push({ boardIndex, cellIndex });
          }
        });
      }
    });
    
    if (validMoves.length > 0) {
      // Choose a random valid move
      const move = validMoves[Math.floor(Math.random() * validMoves.length)];
      
      // Make the move
      const newBoards = [...boards];
      const boardCopy = [...newBoards[move.boardIndex]];
      boardCopy[move.cellIndex] = 'X';
      newBoards[move.boardIndex] = boardCopy;
      setBoards(newBoards);
      
      // Check if the move created a "dead" board
      checkDeadBoard(move.boardIndex, newBoards);
      
      // Switch back to player's turn
      setCurrentPlayer('Player');
    }
  };
  
  // Check if a board is dead (has three in a row)
  const checkDeadBoard = (boardIndex: number, currentBoards: (string | null)[][]) => {
    const board = currentBoards[boardIndex];
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // Horizontal
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // Vertical
      [0, 4, 8], [2, 4, 6]             // Diagonal
    ];
    
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        const newDeadBoards = [...deadBoards];
        newDeadBoards[boardIndex] = true;
        setDeadBoards(newDeadBoards);
        break;
      }
    }
  };
  
  // Change game mode
  const changeGameMode = (mode: string) => {
    setGameMode(mode);
    setShowModeDropdown(false);
    
    // Reset the game when changing modes
    resetGame();
  };
  
  // Reset the game
  const resetGame = () => {
    setBoards([
      Array(9).fill(null),
      Array(9).fill(null),
      Array(9).fill(null),
    ]);
    setDeadBoards([false, false, false]);
    setCurrentPlayer('Player');
  };
  
  // Render a single cell in a tic-tac-toe board
  const renderCell = (boardIndex: number, cellIndex: number) => {
    return (
      <motion.div
        className={`w-10 h-10 border border-cyan-800 flex items-center justify-center 
          ${!deadBoards[boardIndex] ? 'cursor-pointer hover:bg-cyan-900/30' : 'cursor-not-allowed'}
          ${deadBoards[boardIndex] ? 'opacity-50' : 'opacity-100'}`}
        whileHover={!deadBoards[boardIndex] && !boards[boardIndex][cellIndex] ? 
          { backgroundColor: 'rgba(8, 145, 178, 0.2)' } : {}
        }
        onClick={() => handleBoardClick(boardIndex, cellIndex)}
      >
        {boards[boardIndex][cellIndex] && (
          <motion.span 
            className="text-2xl text-red-500 font-bold"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            X
          </motion.span>
        )}
      </motion.div>
    );
  };
  
  // Render a complete tic-tac-toe board
  const renderBoard = (boardIndex: number) => {
    return (
      <motion.div 
        className={`grid grid-cols-3 gap-1 bg-gray-900 p-1 relative 
          ${deadBoards[boardIndex] ? 'border-red-800 border-2' : 'border-cyan-700 border'}`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 * boardIndex }}
      >
        {boards[boardIndex].map((_, cellIndex) => renderCell(boardIndex, cellIndex))}
        
        {/* Dead board overlay */}
        {deadBoards[boardIndex] && (
          <motion.div 
            className="absolute inset-0 bg-red-900/30 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <motion.div 
              className="text-red-500 font-bold text-lg"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200 }}
            >
              DEAD
            </motion.div>
          </motion.div>
        )}
      </motion.div>
    );
  };

  return (
    <div className="min-h-screen bg-black text-white font-['VT323'] overflow-hidden relative">
      {/* CRT overlay effect */}
      <div className="pointer-events-none fixed inset-0 bg-blue-900/5 z-50 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-blue-900/10"></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyIiBoZWlnaHQ9IjIiPjxyZWN0IHdpZHRoPSIyIiBoZWlnaHQ9IjIiIGZpbGw9IiMwMDAiIGZpbGwtb3BhY2l0eT0iMC4wNSIvPjwvc3ZnPg==')] opacity-25"></div>
      </div>
      
      {/* Scanlines effect */}
      <div className="pointer-events-none fixed inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiPjxkZWZzPjxwYXR0ZXJuIGlkPSJwYXR0ZXJuIiB3aWR0aD0iMSIgaGVpZ2h0PSIyIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIiBwYXR0ZXJuVHJhbnNmb3JtPSJyb3RhdGUoOTAgMC41IDAuNSkiPjxyZWN0IHg9IjAiIHk9IjAiIHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9IiMwMDAiIGZpbGwtb3BhY2l0eT0iMC4wNSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3QgeD0iMCIgeT0iMCIgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNwYXR0ZXJuKSIvPjwvc3ZnPg==')] opacity-10 z-40"></div>
      
      {/* Name Input Screen */}
      <AnimatePresence>
        {!playerName && (
          <motion.div 
            className="fixed inset-0 bg-black z-50 flex flex-col items-center justify-center"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div 
              className="text-5xl text-cyan-400 mb-8 tracking-widest"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              NOTAKTO
            </motion.div>
            
            <motion.form 
              className="flex flex-col items-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              onSubmit={handleNameSubmit}
            >
              <label className="text-cyan-500 mb-2 text-xl">ENTER YOUR NAME:</label>
              <input
                type="text"
                value={nameInput}
                onChange={(e) => setNameInput(e.target.value)}
                className="bg-gray-900 border-2 border-cyan-700 p-2 mb-4 text-center w-64 text-white focus:outline-none focus:border-cyan-500"
                placeholder="Enter your name"
                autoFocus
              />
              <motion.button
                type="submit"
                className="bg-gradient-to-r from-red-600 to-red-800 px-6 py-2 text-white font-bold tracking-wider rounded"
                whileHover={{ scale: 1.05, boxShadow: "0 0 15px 0 rgba(255, 0, 0, 0.5)" }}
              >
                START GAME
              </motion.button>
            </motion.form>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Loading screen after name is entered */}
      <AnimatePresence>
        {playerName && !gameStarted && (
          <motion.div 
            className="fixed inset-0 bg-black z-50 flex flex-col items-center justify-center"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div 
              className="text-5xl text-cyan-400 mb-8 tracking-widest"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              WELCOME {playerName.toUpperCase()}
            </motion.div>
            <motion.div 
              className="w-64 h-2 bg-gray-800 rounded-full overflow-hidden"
              initial={{ width: 0 }}
              animate={{ width: "16rem" }}
              transition={{ duration: 0.3 }}
            >
              <motion.div 
                className="h-full bg-gradient-to-r from-red-500 to-cyan-500"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 1 }}
              />
            </motion.div>
            <motion.div 
              className="text-sm text-cyan-600 mt-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              INITIALIZING GAME MATRIX...
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navbar */}
      <Navbar />
      
      {/* Main Game Content */}
      {gameStarted && (
        <motion.main 
          className="container mx-auto px-4 py-8 relative z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {/* Player Stats and Turn Indicator */}
          <motion.div 
            className="bg-gray-900 border border-cyan-800 p-4 mb-6 relative"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
          >
            <div className="text-2xl text-center mb-3 border-b border-cyan-800 pb-2">{playerName}</div>
            <div className="flex justify-around text-xl">
              <div className="flex flex-col items-center">
                <div className="text-yellow-400">Coins: {stats.coins}</div>
                <motion.div 
                  className="text-xs text-gray-500"
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  +2 per win
                </motion.div>
              </div>
              <div className="flex flex-col items-center">
                <div className="text-blue-400">XP: {stats.xp}</div>
                <motion.div 
                  className="text-xs text-gray-500"
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                >
                  +15 per game
                </motion.div>
              </div>
              <div className="flex flex-col items-center">
                <div className="text-green-400">$: {stats.dollars}</div>
                <motion.div 
                  className="text-xs text-gray-500"
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                >
                  Premium currency
                </motion.div>
              </div>
            </div>
            
            {/* Current Turn Indicator */}
            <motion.div 
              className="mt-4 text-center text-lg"
              animate={{ 
                color: currentPlayer === 'Player' ? '#38bdf8' : '#ef4444',
                scale: [1, 1.05, 1]
              }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              {currentPlayer === 'Player' ? `${playerName}'s` : "Computer's"} Turn
            </motion.div>
          </motion.div>
          
          {/* Game Mode Selector */}
          <motion.div 
            className="relative mb-6"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="flex items-center">
              <div className="bg-gray-900 border border-cyan-800 py-2 px-4 flex items-center">
                <span className="mr-2">Play with:</span>
                <div className="relative">
                  <button 
                    className="bg-cyan-900 px-3 py-1 rounded flex items-center"
                    onClick={() => setShowModeDropdown(!showModeDropdown)}
                  >
                    {gameMode === 'computer' ? 'Computer' : gameMode === 'solo' ? 'Solo' : 'Duo'}
                    <span className="ml-2">▼</span>
                  </button>
                  
                  {/* Mode dropdown */}
                  {showModeDropdown && (
                    <motion.div 
                      className="absolute top-full left-0 mt-1 w-full bg-gray-900 border border-cyan-800 z-20"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      <button 
                        className={`w-full text-left px-3 py-1 hover:bg-cyan-900/50 ${gameMode === 'computer' ? 'bg-cyan-900' : ''}`}
                        onClick={() => changeGameMode('computer')}
                      >
                        Computer
                      </button>
                      <button 
                        className={`w-full text-left px-3 py-1 hover:bg-cyan-900/50 ${gameMode === 'solo' ? 'bg-cyan-900' : ''}`}
                        onClick={() => changeGameMode('solo')}
                      >
                        Solo
                      </button>
                      <button 
                        className={`w-full text-left px-3 py-1 hover:bg-cyan-900/50 ${gameMode === 'duo' ? 'bg-cyan-900' : ''}`}
                        onClick={() => changeGameMode('duo')}
                      >
                        Duo
                      </button>
                    </motion.div>
                  )}
                </div>
              </div>
              
              {/* Reset button */}
              <motion.button 
                className="ml-4 bg-red-900 py-2 px-4 rounded"
                whileHover={{ backgroundColor: '#b91c1c' }}
                onClick={resetGame}
              >
                Reset Game
              </motion.button>
            </div>
          </motion.div>
          
          {/* Game Boards */}
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            {[0, 1, 2].map(boardIndex => renderBoard(boardIndex))}
          </motion.div>
          
          {/* Game Instructions */}
          <motion.div 
            className="mt-8 bg-gray-900/50 p-4 border border-cyan-900/30"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
          >
            <h3 className="text-cyan-400 text-xl mb-2">How to Play:</h3>
            <p className="text-gray-400">
              In Notakto, all marks are X's. Take turns placing X's on any open cell in any board. 
              The goal is to avoid completing three X's in a row (horizontally, vertically, or diagonally).
              Once a board has three X's in a row, it becomes "dead" and can no longer be used.
              The player who is forced to make the last move on the last available board loses!
            </p>
          </motion.div>
        </motion.main>
      )}
      
      {/* Pixel particles effect covering the entire main content */}
      <motion.div className="fixed inset-0 w-full h-full pointer-events-none z-0">
        {[...Array(30)].map((_, i) => (
          <motion.div 
            key={i} 
            className="absolute w-2 h-2 bg-cyan-400 rounded-none opacity-70"
            initial={{ 
              x: Math.random() * window.innerWidth, 
              y: -20 
            }}
            animate={{ 
              y: window.innerHeight + 20,
              opacity: [0.7, 0.3, 0.7],
              rotate: [0, 180, 360]
            }}
            transition={{ 
              repeat: Infinity, 
              duration: 6 + Math.random() * 10, 
              delay: Math.random() * 5,
              ease: "linear",
              times: [0, 0.5, 1]
            }} 
          />
        ))}
      </motion.div>
    </div>
  );
};

export default GamePage;