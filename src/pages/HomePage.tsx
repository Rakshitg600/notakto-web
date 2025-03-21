import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Sound imports would go here in a real implementation
// import soloHoverSound from '../assets/sounds/solo-hover.wav';
// import duoHoverSound from '../assets/sounds/duo-hover.wav';
// import liveHoverSound from '../assets/sounds/live-hover.wav';

const HomePage: React.FC = () => {
  const [loaded, setLoaded] = useState(false);
  
  // Simulating loading state
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoaded(true);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  // Function to play sound (in a real implementation)
  const playHoverSound = (gameMode: string) => {
    // In a real implementation, this would play the corresponding sound
    console.log(`Playing ${gameMode} hover sound`);
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
      
      {/* Loading screen */}
      <AnimatePresence>
        {!loaded && (
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
                transition={{ duration: 0.8 }}
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
      <motion.nav 
        className="px-6 py-4 flex justify-between items-center border-b border-cyan-900/50"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1.2, type: "spring", stiffness: 100 }}
      >
        {/* Left side - Menu items */}
        <div className="flex space-x-8">
          {["Tutorial", "Downloads", "Settings", "Sign In"].map((item, index) => (
            <motion.a
              key={item}
              href={`#${item.toLowerCase().replace(" ", "-")}`}
              className="relative text-xl hover:text-cyan-400 transition-colors"
              whileHover={{ scale: 1.05 }}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 + index * 0.1 }}
            >
              <span className="relative z-10">{item}</span>
              <motion.span 
                className="absolute -left-2 -right-2 h-0.5 bg-red-500 bottom-0"
                initial={{ scaleX: 0 }}
                whileHover={{ scaleX: 1 }}
                transition={{ duration: 0.2 }}
              />
            </motion.a>
          ))}
        </div>
        
        {/* Right side - Logo */}
        <motion.div 
          className="text-2xl font-bold tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-red-500"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          NOTAKTO
        </motion.div>
      </motion.nav>

      {/* Main content */}
      <motion.main 
        className="container mx-auto px-4 py-16"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        {/* Main title */}
        <motion.div 
          className="text-center mb-16"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.6, duration: 0.5 }}
        >
          <h1 className="text-6xl font-bold mb-4 tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-white to-cyan-400">
            WELCOME TO NOTAKTO
          </h1>
          <p className="text-xl text-cyan-400 tracking-wide">
            The ultimate tic-tac-toe variant where all marks are X's
          </p>
        </motion.div>

        {/* Game mode cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
          {[
            { 
              title: "SOLO MODE", 
              icon: "👤", 
              description: "Challenge the AI in an impossible battle of wits", 
              color: "from-cyan-500 to-cyan-900",
              hoverColor: "from-cyan-400 to-cyan-800",
              borderColor: "border-cyan-700"
            },
            { 
              title: "DUO MODE", 
              icon: "👥", 
              description: "Play against a friend on the same device", 
              color: "from-red-500 to-red-900",
              hoverColor: "from-red-400 to-red-800",
              borderColor: "border-red-700"
            },
            { 
              title: "LIVE MODE", 
              icon: "🌐", 
              description: "Compete online against players worldwide", 
              color: "from-purple-500 to-purple-900",
              hoverColor: "from-purple-400 to-purple-800",
              borderColor: "border-purple-700"
            }
          ].map((mode, index) => (
            <motion.div
              key={mode.title}
              className={`relative p-1 rounded-lg overflow-hidden `}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.8 + index * 0.2 }}
              whileHover={{ scale: 1.03 }}
            >
              {/* Neon glow border */}
              <motion.div 
                className={`absolute inset-0 bg-gradient-to-br ${mode.color} opacity-50 blur-sm`}
                whileHover={{ opacity: 0.8, scale: 1.1 }}
                transition={{ duration: 0.3 }}
              />
              
              <motion.div 
                className={`h-full relative z-10 border-2 ${mode.borderColor} rounded-lg p-6 bg-gray-900/90 flex flex-col items-center cursor-pointer min-h-64`}
                whileHover="hover"
                onHoverStart={() => playHoverSound(mode.title.toLowerCase().split(' ')[0])}
              >
                {/* Pixel art background pattern */}
                <div className="absolute inset-0 opacity-10 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCI+PHJlY3QgeD0iMCIgeT0iMCIgd2lkdGg9IjEwIiBoZWlnaHQ9IjEwIiBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9IjAuMSIvPjwvc3ZnPg==')]"></div>
                
                {/* Icon */}
                <motion.div 
                  className={`text-4xl mb-6 mt-2 ${mode.title === "SOLO MODE" ? "text-cyan-500" : mode.title === "DUO MODE" ? "text-red-500" : "text-purple-500"}`}
                  variants={{
                    hover: { scale: 1.2, rotate: 5 }
                  }}
                >
                  {mode.icon}
                </motion.div>
                
                {/* Title */}
                <motion.h2 
                  className="text-2xl font-bold mb-3 tracking-wider"
                  variants={{
                    hover: { textShadow: "0 0 8px rgba(0, 255, 255, 0.8)" }
                  }}
                >
                  {mode.title}
                </motion.h2>
                
                {/* Description */}
                <p className="text-center text-gray-400 mb-6">
                  {mode.description}
                </p>
                
                {/* Play button */}
                <motion.button 
                  className={`mt-auto px-6 py-2 rounded bg-gradient-to-r ${mode.color} text-white font-bold tracking-wider`}
                  variants={{
                    hover: { 
                      scale: 1.05, 
                      boxShadow: `0 0 15px 0 rgba(0, 255, 255, 0.5)`,
                      backgroundImage: `linear-gradient(to right, ${mode.hoverColor})`
                    }
                  }}
                >
                  PLAY NOW
                </motion.button>
                
                {/* Small pixels in the corners for decoration */}
                <div className="absolute top-2 left-2 w-2 h-2 bg-white opacity-70"></div>
                <div className="absolute top-2 right-2 w-2 h-2 bg-white opacity-70"></div>
                <div className="absolute bottom-2 left-2 w-2 h-2 bg-white opacity-70"></div>
                <div className="absolute bottom-2 right-2 w-2 h-2 bg-white opacity-70"></div>
              </motion.div>
            </motion.div>
          ))}
        </div>
        
        {/* Bottom section */}
        <motion.div 
          className="mt-20 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.4 }}
        >
          <motion.button 
            className="px-8 py-3 bg-red-600 text-white font-bold text-xl rounded-lg tracking-wider relative overflow-hidden group"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <span className="relative z-10">START YOUR JOURNEY</span>
            <motion.div 
              className="absolute inset-0 bg-gradient-to-r from-red-500 to-red-700"
              initial={{ x: "-100%" }}
              whileHover={{ x: 0 }}
              transition={{ duration: 0.5 }}
            />
          </motion.button>
          
          <p className="mt-6 text-cyan-600">
            v1.0.4 | CyberMind Studios © 2025
          </p>
        </motion.div>
      </motion.main>
    </div>
  );
};

export default HomePage;