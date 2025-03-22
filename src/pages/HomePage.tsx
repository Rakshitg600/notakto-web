import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import customLogo from '../assets/notakto.svg';

// Sound imports would go here in a real implementation
// import soloHoverSound from '../assets/sounds/solo-hover.wav';
// import duoHoverSound from '../assets/sounds/duo-hover.wav';
// import liveHoverSound from '../assets/sounds/live-hover.wav';

const HomePage: React.FC = () => {
  const [loaded, setLoaded] = useState(false);
  const [downloadsOpen, setDownloadsOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
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

  // Close mobile menu on window resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768 && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [mobileMenuOpen]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (mobileMenuOpen && !target.closest('.mobile-menu') && !target.closest('.menu-button')) {
        setMobileMenuOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [mobileMenuOpen]);

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
        className="px-6 py-4 flex justify-between items-center border-b border-cyan-900/50 relative z-50"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1.2, type: "spring", stiffness: 100 }}
      >
        {/* Left side - Logo */}
        <motion.div 
          className="text-4xl font-bold tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-red-500 flex items-center gap-3"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          {/* Game icon */}
          <img 
            src={customLogo} 
            alt="Notakto Logo" 
            className="w-10 h-10 md:w-12 md:h-12 filter drop-shadow-glow" 
            style={{ filter: 'drop-shadow(0 0 4px #00ccff)' }}
          />
          
          NOTAKTO
        </motion.div>

        {/* Hamburger menu button - visible on mobile */}
        <motion.button
          className="md:hidden menu-button relative z-50 flex flex-col justify-center items-center w-8 h-8"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          whileTap={{ scale: 0.9 }}
        >
          <motion.span
            className={`w-6 h-0.5 bg-cyan-400 rounded-sm transition-all duration-300 ${mobileMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`}
            style={{ marginBottom: '5px' }}
          />
          <motion.span
            className={`w-6 h-0.5 bg-cyan-400 rounded-sm transition-all duration-300 ${mobileMenuOpen ? 'opacity-0' : 'opacity-100'}`}
            style={{ marginBottom: '5px' }}
          />
          <motion.span
            className={`w-6 h-0.5 bg-cyan-400 rounded-sm transition-all duration-300 ${mobileMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`}
          />
        </motion.button>

        {/* Desktop menu - hidden on mobile */}
        <div className="hidden md:flex space-x-8">
          <motion.a
            key="Tutorial"
            href="#tutorial"
            className="relative text-xl hover:text-cyan-400 transition-colors"
            whileHover={{ scale: 1.05 }}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 }}
          >
            <span className="relative z-10">Tutorial</span>
            <motion.span 
              className="absolute -left-2 -right-2 h-0.5 bg-red-500 bottom-0"
              initial={{ scaleX: 0 }}
              whileHover={{ scaleX: 1 }}
              transition={{ duration: 0.2 }}
            />
          </motion.a>

          {/* Downloads with dropdown */}
          <div 
            className="relative"
            onMouseEnter={() => setDownloadsOpen(true)}
            onMouseLeave={() => setDownloadsOpen(false)}
          >
            <motion.div
              key="Downloads"
              className="relative text-xl hover:text-cyan-400 transition-colors cursor-pointer"
              whileHover={{ scale: 1.05 }}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.3 }}
            >
              <span className="relative z-10 flex items-center">
                Downloads
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className={`h-4 w-4 ml-1 transition-transform ${downloadsOpen ? 'rotate-180' : ''}`} 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </span>
              <motion.span 
                className="absolute -left-2 -right-2 h-0.5 bg-red-500 bottom-0"
                initial={{ scaleX: 0 }}
                whileHover={{ scaleX: 1 }}
                transition={{ duration: 0.2 }}
              />
            </motion.div>
            
            {/* Dropdown menu */}
            <AnimatePresence>
              {downloadsOpen && (
                <motion.div 
                  className="absolute top-full left-0 mt-2 z-50 bg-gray-900 border border-cyan-900/50 rounded-lg overflow-hidden w-36"
                  initial={{ opacity: 0, y: -10, scaleY: 0.8 }}
                  animate={{ opacity: 1, y: 0, scaleY: 1 }}
                  exit={{ opacity: 0, y: -10, scaleY: 0.8 }}
                  transition={{ duration: 0.2 }}
                >
                  {["Android", "iOS", "Windows", "Linux", "MacOS"].map((platform, idx) => (
                    <motion.a
                      key={platform}
                      href={`#download-${platform.toLowerCase()}`}
                      className="block px-4 py-2 text-lg hover:bg-gradient-to-r hover:from-cyan-900/50 hover:to-transparent hover:text-cyan-400 transition-colors"
                      whileHover={{ x: 5 }}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.05 }}
                    >
                      {platform}
                    </motion.a>
                  ))}
                  
                  {/* Pixel decoration */}
                  <div className="absolute top-2 left-2 w-1 h-1 bg-cyan-500 opacity-70"></div>
                  <div className="absolute bottom-2 right-2 w-1 h-1 bg-cyan-500 opacity-70"></div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Other menu items */}
          {["Settings", "Sign In"].map((item, index) => (
            <motion.a
              key={item}
              href={`#${item.toLowerCase().replace(" ", "-")}`}
              className="relative text-xl hover:text-cyan-400 transition-colors"
              whileHover={{ scale: 1.05 }}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4 + index * 0.1 }}
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

        {/* Mobile menu - fixed full screen overlay */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div 
              className="fixed inset-0 bg-black/95 flex items-center justify-center mobile-menu z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <motion.div 
                className="flex flex-col items-center space-y-8 p-8 border border-cyan-900/50 rounded-lg bg-gray-900/50 backdrop-blur-sm"
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
              >
                {/* CRT scanlines effect */}
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiPjxkZWZzPjxwYXR0ZXJuIGlkPSJwYXR0ZXJuIiB3aWR0aD0iMSIgaGVpZ2h0PSIyIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIiBwYXR0ZXJuVHJhbnNmb3JtPSJyb3RhdGUoOTAgMC41IDAuNSkiPjxyZWN0IHg9IjAiIHk9IjAiIHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9IiMwMDAiIGZpbGwtb3BhY2l0eT0iMC4wNSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3QgeD0iMCIgeT0iMCIgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNwYXR0ZXJuKSIvPjwvc3ZnPg==')] opacity-10 z-0"></div>
                
                {/* Menu items */}
                <motion.a
                  href="#tutorial"
                  className="text-2xl hover:text-cyan-400 transition-colors relative"
                  whileHover={{ x: 5, scale: 1.05 }}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Tutorial
                  <motion.span 
                    className="absolute -left-2 -right-2 h-0.5 bg-red-500 bottom-0"
                    initial={{ scaleX: 0 }}
                    whileHover={{ scaleX: 1 }}
                    transition={{ duration: 0.2 }}
                  />
                </motion.a>
                
                {/* Mobile Downloads submenu */}
                <div className="flex flex-col space-y-3 items-center">
                  <motion.div
                    className="text-2xl text-cyan-400 font-bold"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    Downloads
                  </motion.div>
                  
                  <div className="flex flex-wrap justify-center gap-3">
                    {["Android", "iOS", "Windows", "Linux", "MacOS"].map((platform, idx) => (
                      <motion.a
                        key={platform}
                        href={`#download-${platform.toLowerCase()}`}
                        className="px-3 py-1.5 text-lg bg-gray-800/50 hover:bg-cyan-900/50 rounded-md border border-cyan-900/30 hover:border-cyan-500/50 transition-colors"
                        whileHover={{ scale: 1.05 }}
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 + idx * 0.05 }}
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {platform}
                      </motion.a>
                    ))}
                  </div>
                </div>
                
                {["Settings", "Sign In"].map((item, idx) => (
                  <motion.a
                    key={item}
                    href={`#${item.toLowerCase().replace(" ", "-")}`}
                    className="text-2xl hover:text-cyan-400 transition-colors relative"
                    whileHover={{ x: 5, scale: 1.05 }}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 + idx * 0.1 }}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item}
                    <motion.span 
                      className="absolute -left-2 -right-2 h-0.5 bg-red-500 bottom-0"
                      initial={{ scaleX: 0 }}
                      whileHover={{ scaleX: 1 }}
                      transition={{ duration: 0.2 }}
                    />
                  </motion.a>
                ))}
                
                {/* Decorative pixels */}
                <div className="absolute top-2 left-2 w-2 h-2 bg-cyan-500 opacity-70"></div>
                <div className="absolute top-2 right-2 w-2 h-2 bg-red-500 opacity-70"></div>
                <div className="absolute bottom-2 left-2 w-2 h-2 bg-red-500 opacity-70"></div>
                <div className="absolute bottom-2 right-2 w-2 h-2 bg-cyan-500 opacity-70"></div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Main content */}
      <motion.main 
        className="container mx-auto px-4 py-16 relative overflow-hidden" 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        transition={{ delay: 1.5 }}
      >
        {/* Pixel particles effect covering the entire main content */}
        <motion.div className="fixed inset-0 w-full h-full pointer-events-none z-0">
          {[...Array(50)].map((_, i) => (
            <motion.div 
              key={i} 
              className={`absolute w-2 h-2 bg-cyan-400 rounded-none opacity-70`}
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
      
        {/* Main title with enhanced effects */}
        <motion.div 
          className="text-center mb-16 relative z-10"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.6, duration: 0.5 }}
        >
          {/* Background pulse effect */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-red-500/20 via-white/10 to-cyan-400/20 rounded-lg"
            animate={{ 
              scale: [1, 1.05, 1],
              opacity: [0.5, 0.8, 0.5]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          
          {/* Glitch effect container */}
          <div className="relative">
            <h1 
              className="font-['VT323'] text-6xl font-bold mb-4 tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-white to-cyan-400 relative z-10"
            >
              WELCOME TO NOTAKTO
            </h1>
            
            {/* Shadow layers for 3D effect */}
            <motion.div 
              className="absolute top-0 left-0 w-full h-full font-['VT323'] text-6xl font-bold tracking-widest text-red-500/30 z-0"
              animate={{ x: [0, -3, 0], y: [0, 2, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              WELCOME TO NOTAKTO
            </motion.div>
            
            {/* Glitch animation */}
            <motion.div
              className="absolute top-0 left-0 w-full h-full font-['VT323'] text-6xl font-bold tracking-widest text-cyan-400/40 z-0 overflow-hidden"
              animate={{
                clipPath: [
                  "inset(0% 0% 0% 0%)",
                  "inset(40% 0% 40% 0%)",
                  "inset(20% 0% 60% 0%)",
                  "inset(0% 0% 0% 0%)"
                ],
                x: [0, 3, -3, 0],
              }}
              transition={{
                duration: 0.5,
                repeat: Infinity,
                repeatDelay: 5,
              }}
            >
              WELCOME TO NOTAKTO
            </motion.div>
          </div>
          
          {/* Subtitle with floating animation */}
          <motion.p 
            className="font-['VT323'] text-xl text-cyan-400 tracking-wide relative z-10"
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          >
            The ultimate tic-tac-toe variant where all marks are X's
          </motion.p>
          
          {/* Pixel-style decorative elements */}
          <motion.div 
            className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            {[...Array(5)].map((_, i) => (
              <div 
                key={i} 
                className="w-3 h-3 bg-gradient-to-br from-red-500 to-cyan-400"
              />
            ))}
          </motion.div>
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
              borderColor: "border-cyan-700",
              glowColor: "cyan"
            },
            { 
              title: "DUO MODE", 
              icon: "👥", 
              description: "Play against a friend on the same device", 
              color: "from-red-500 to-red-900",
              hoverColor: "from-red-400 to-red-800",
              borderColor: "border-red-700",
              glowColor: "red"
            },
            { 
              title: "LIVE MODE", 
              icon: "🌐", 
              description: "Compete online against players worldwide", 
              color: "from-purple-500 to-purple-900",
              hoverColor: "from-purple-400 to-purple-800",
              borderColor: "border-purple-700",
              glowColor: "purple"
            }
          ].map((mode, index) => (
            <motion.div
              key={mode.title}
              className={`relative p-1 rounded-lg overflow-hidden`}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + index * 0.2 }}
              whileHover={{ 
                scale: 1.05, 
                transition: { duration: 0.01}
              }}
            >
              {/* Enhanced Neon glow border with more pronounced effect on hover */}
              <motion.div 
                className={`absolute inset-0 bg-gradient-to-br ${mode.color} opacity-50 blur-sm`}
                whileHover={{ 
                  opacity: 0.8, 
                  scale: 1.1,
                  filter: "blur(12px)"
                }}
                transition={{ duration: 0.01 }}
              />
              
              <motion.div 
                className={`h-full relative z-10 border-2 ${mode.borderColor} rounded-lg p-6 bg-gray-900/90 flex flex-col items-center cursor-pointer min-h-64`}
                whileHover={{ 
                  boxShadow: `0 0 20px 5px rgba(${mode.glowColor === 'cyan' ? '0, 255, 255' : mode.glowColor === 'red' ? '255, 0, 0' : '128, 0, 255'}, 0.3)`,
                  transition: { duration: 0.01 }
                }}
                onHoverStart={() => playHoverSound(mode.title.toLowerCase().split(' ')[0])}
              >
                {/* Pixel art background pattern */}
                <div className="absolute inset-0 opacity-10 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCI+PHJlY3QgeD0iMCIgeT0iMCIgd2lkdGg9IjEwIiBoZWlnaHQ9IjEwIiBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9IjAuMSIvPjwvc3ZnPg==')]"></div>
                
                {/* Icon with enhanced hover effect */}
                <motion.div 
                  className={`text-4xl mb-6 mt-2 ${mode.title === "SOLO MODE" ? "text-cyan-500" : mode.title === "DUO MODE" ? "text-red-500" : "text-purple-500"}`}
                  variants={{
                    hover: { 
                      scale: 1.2, 
                      rotate: 5, 
                      textShadow: `0 0 10px rgba(${mode.glowColor === 'cyan' ? '0, 255, 255' : mode.glowColor === 'red' ? '255, 0, 0' : '128, 0, 255'}, 0.8)`
                    }
                  }}
                >
                  {mode.icon}
                </motion.div>
                
                {/* Title with enhanced glow effect */}
                <motion.h2 
                  className="text-2xl font-bold mb-3 tracking-wider"
                  variants={{
                    hover: { 
                      textShadow: `0 0 8px rgba(${mode.glowColor === 'cyan' ? '0, 255, 255' : mode.glowColor === 'red' ? '255, 0, 0' : '128, 0, 255'}, 0.8)` 
                    }
                  }}
                >
                  {mode.title}
                </motion.h2>
                
                {/* Description */}
                <p className="text-center text-gray-400 mb-6">
                  {mode.description}
                </p>
                
                {/* Play button with enhanced hover effect */}
                <motion.button 
                  className={`mt-auto px-6 py-2 rounded bg-gradient-to-r ${mode.color} text-white font-bold tracking-wider`}
                  variants={{
                    hover: { 
                      scale: 1.05, 
                      boxShadow: `0 0 15px 0 rgba(${mode.glowColor === 'cyan' ? '0, 255, 255' : mode.glowColor === 'red' ? '255, 0, 0' : '128, 0, 255'}, 0.5)`,
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
          className="px-8 py-3 bg-red-600 text-white font-bold text-xl rounded-lg tracking-wider relative overflow-hidden group cursor-pointer hover:cursor-[url('/api/placeholder/32/32'),pointer]"
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