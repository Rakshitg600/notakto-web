import React from 'react'
import { motion, AnimatePresence } from 'framer-motion';
import logo from "../assets/notakto-logo.jpeg";

const Navbar = () => {
  return (
    <div><motion.nav
      className="px-6 py-4 flex justify-between items-center border-b border-cyan-900/50"
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 1.2, type: "spring", stiffness: 100 }}
    >
      {/* Left side - Logo and Name */}
      <motion.div 
        className="flex items-center space-x-2"
        whileHover={{ scale: 1.05 }}
        transition={{ type: "spring", stiffness: 400, damping: 10 }}
      >
        {/* Logo Image */}
        <img 
          src={logo} 
          alt="Notakto Logo" 
          className="w-8 h-8"
        />
        
        {/* NOTAKTO text */}
        <div 
          className="text-2xl font-bold tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-red-500"
        >
          NOTAKTO
        </div>
      </motion.div>
      
      {/* Right side - Menu items */}
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
    </motion.nav></div>
  )
}

export default Navbar