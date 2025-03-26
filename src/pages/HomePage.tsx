import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import chiptune from "../assets/button-sound.mp3";

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const [loaded, setLoaded] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoaded(true);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const playHoverSound = (gameMode: string) => {
    const audio = new Audio(chiptune);
    audio.play();
    console.log(`Playing ${gameMode} hover sound`);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768 && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [mobileMenuOpen]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (mobileMenuOpen && !target.closest('.mobile-menu') && !target.closest('.menu-button')) {
        setMobileMenuOpen(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [mobileMenuOpen]);

  const handleModeNavigation = (mode: string) => {
    playHoverSound(mode.toLowerCase());
    switch(mode) {
      case 'SOLO MODE':
        navigate('/solo');
        break;
      case 'DUO MODE':
        navigate('/duo');
        break;
      case 'LIVE MODE':
        navigate('/live');
        break;
      default:
        console.error('Invalid mode');
    }
  };

  return (
    <div className="min-h-screen bg-black text-white font-['VT323'] overflow-hidden relative">
      {/* CRT overlay effects */}
      <div className="pointer-events-none fixed inset-0 bg-blue-900/5 z-50 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-blue-900/10"></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyIiBoZWlnaHQ9IjIiPjxyZWN0IHdpZHRoPSIyIiBoZWlnaHQ9IjIiIGZpbGw9IiMwMDAiIGZpbGwtb3BhY2l0eT0iMC4wNSIvPjwvc3ZnPg==')] opacity-25"></div>
      </div>

      {/* Scanlines effect */}
      <div className="pointer-events-none fixed inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiPjxkZWZzPjxwYXR0ZXJuIGlkPSJwYXR0ZXJuIiB3aWR0aD0iMSIgaGVpZ2h0PSIyIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIiBwYXR0ZXJuVHJhbnNmb3JtPSJyb3RhdGUoOTAgMC41IDAuNSkiPjxyZWN0IHg9IjAiIHk9IjAiIHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9IiMwMDAiIGZpbGwtb3BhY2l0eT0iMC4wNSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3QgeD0iMCIgeT0iMCIgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNwYXR0ZXJuKSIvPjwvc3ZnPg==')] opacity-10 z-40"></div>

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
              className="w-64 h-2 bg-gray-800 overflow-hidden"
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

      <Navbar onSettingsClick={() => console.log('Settings clicked')} />

      <motion.main
        className="container mx-auto px-4 py-16 relative overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        {/* Pixel particles effect */}
        <motion.div className="fixed inset-0 w-full h-full pointer-events-none z-0">
          {[...Array(50)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-cyan-400 rounded-none opacity-70"
              initial={{ x: Math.random() * window.innerWidth, y: -20 }}
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

        {/* Main title */}
        <motion.div
          className="text-center mb-16 relative z-10"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.6, duration: 0.5 }}
        >
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-red-500/20 via-white/10 to-cyan-400/20"
            animate={{
              scale: [1, 1.05, 1],
              opacity: [0.5, 0.8, 0.5]
            }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
          <div className="relative">
            <h1 className="font-['VT323'] text-6xl font-bold mb-4 tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-white to-cyan-400 relative z-10">
              WELCOME TO NOTAKTO
            </h1>
            <motion.div
              className="absolute top-0 left-0 w-full h-full font-['VT323'] text-6xl font-bold tracking-widest text-red-500/30 z-0"
              animate={{ x: [0, -3, 0], y: [0, 2, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              WELCOME TO NOTAKTO
            </motion.div>
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
              transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 5 }}
            >
              WELCOME TO NOTAKTO
            </motion.div>
          </div>

          <motion.p
            className="font-['VT323'] text-xl text-cyan-400 tracking-wide relative z-10"
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          >
            No Ties, Always a winner
          </motion.p>

          <motion.div
            className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            {[...Array(5)].map((_, i) => (
              <div key={i} className="w-3 h-3 bg-gradient-to-br from-red-500 to-cyan-400" />
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
              className="relative p-1 overflow-hidden"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + index * 0.2 }}
              whileHover={{ scale: 1.05, transition: { duration: 0.01 } }}
            >
              <motion.div
                className={`absolute inset-0 bg-gradient-to-br ${mode.color} opacity-50 blur-sm`}
                whileHover={{ opacity: 0.8, scale: 1.1, filter: "blur(12px)" }}
                transition={{ duration: 0.01 }}
              />
              <motion.div
                className={`h-full relative z-10 border-2 ${mode.borderColor} p-6 bg-gray-900/90 flex flex-col items-center min-h-64`}
                whileHover={{
                  boxShadow: `0 0 20px 5px rgba(${mode.glowColor === 'cyan' ? '0, 255, 255' : mode.glowColor === 'red' ? '255, 0, 0' : '128, 0, 255'}, 0.3)`,
                  transition: { duration: 0.01 }
                }}
                onHoverStart={() => playHoverSound(mode.title.toLowerCase().split(' ')[0])}
              >
                <div className="absolute inset-0 opacity-10 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCI+PHJlY3QgeD0iMCIgeT0iMCIgd2lkdGg9IjEwIiBoZWlnaHQ9IjEwIiBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9IjAuMSIvPjwvc3ZnPg==')]"></div>
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
                <motion.h2 className="text-2xl font-bold mb-3 tracking-wider">
                  {mode.title}
                </motion.h2>
                <p className="text-center text-gray-400 mb-6">{mode.description}</p>
                <motion.button
                  onClick={() => handleModeNavigation(mode.title)}
                  className="mt-auto w-full flex justify-center cursor-pointer"
                >
                  <motion.div
                    className="px-6 py-2 cursor-pointer bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold tracking-wider w-full mx-4 mb-2 text-center"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    PLAY NOW
                  </motion.div>
                </motion.button>
                <div className="absolute top-2 left-2 w-2 h-2 bg-white opacity-70"></div>
                <div className="absolute top-2 right-2 w-2 h-2 bg-white opacity-70"></div>
                <div className="absolute bottom-2 left-2 w-2 h-2 bg-white opacity-70"></div>
                <div className="absolute bottom-2 right-2 w-2 h-2 bg-white opacity-70"></div>
              </motion.div>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="mt-20 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.4 }}
        >
          <p className="mt-6 text-cyan-600">Team Notakto © 2025</p>
        </motion.div>
      </motion.main>
    </div>
  );
};

export default HomePage;