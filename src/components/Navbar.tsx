import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import customLogo from '../assets/notakto.svg';


const Navbar: React.FC = () => {
  const [downloadsOpen, setDownloadsOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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

  return (
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
        className="w-10 h-10 md:w-12 md:h-12 filter drop-shadow-glow custom-logo-shadow" 
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
  );
};

export default Navbar;
