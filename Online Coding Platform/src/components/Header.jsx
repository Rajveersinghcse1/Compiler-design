import React from 'react';
import { FaPlay, FaCode, FaCpu, FaRocket, FaBolt } from 'react-icons/fa';

const Header = ({ darkMode, toggleDarkMode, isExecuting, onRunCode, executionTime }) => {
  return (
    <header className="glass-card m-6 p-6 fade-in">
      <div className="flex items-center justify-between">
        {/* Ultra-Modern Branding */}
        <div className="flex items-center space-x-4">
          <div className="relative">
            <div className="w-12 h-12 bg-gradient-to-br from-cyan-400 to-purple-600 rounded-xl flex items-center justify-center pulse-glow">
              <FaCpu className="w-6 h-6 text-white" />
            </div>
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full animate-pulse"></div>
          </div>
          <div>
            <h1 className="heading-primary">CodeForge AI</h1>
            <p className="heading-secondary">Neural Development Environment</p>
          </div>
        </div>

        {/* Ultra-Modern Controls */}
        <div className="flex items-center space-x-6">
          {/* Execution Stats */}
          {executionTime && (
            <div className="status-badge status-online">
              <FaBolt className="w-3 h-3" />
              <span>{executionTime}ms</span>
            </div>
          )}

          {/* System Status */}
          <div className="status-badge status-online">
            <div className="w-2 h-2 bg-green-400 rounded-full pulse-glow"></div>
            <span>Online</span>
          </div>

          {/* Execute Button */}
          <button
            onClick={onRunCode}
            disabled={isExecuting}
            className={`btn-primary ${isExecuting ? 'opacity-75 cursor-not-allowed' : ''}`}
          >
            {isExecuting ? (
              <>
                <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
                <span>Processing</span>
              </>
            ) : (
              <>
                <FaRocket className="w-4 h-4" />
                <span>Execute Code</span>
              </>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
                  <FaBolt className="inline w-3 h-3 mr-1" />
                  CODE • COMPILE • CONQUER
                </p>
              </div>
            </div>

            {/* Gaming Stats & Controls */}
            <div className="flex items-center space-x-6">
              
              {/* Execution Time Display */}
              {executionTime && (
                <div className="gaming-card px-4 py-2 glow-effect">
                  <div className="flex items-center space-x-2 text-green-400">
                    <FaClock className="w-4 h-4 animate-pulse" />
                    <span className="text-sm font-mono font-bold">{executionTime}ms</span>
                    <span className="text-xs text-purple-300">EXEC TIME</span>
                  </div>
                </div>
              )}

              {/* Run Button - Gaming Style */}
              <button
                onClick={onRunCode}
                disabled={isExecuting}
                className={`neon-button group relative flex items-center space-x-3 px-6 py-3 ${
                  isExecuting 
                    ? 'opacity-75 cursor-not-allowed bg-gradient-to-r from-orange-500 to-red-600' 
                    : 'hover:scale-105'
                }`}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-purple-600 rounded-lg blur opacity-25 group-hover:opacity-75 transition duration-300"></div>
                <div className="relative flex items-center space-x-2">
                  {isExecuting ? (
                    <>
                      <div className="loading-spinner"></div>
                      <span className="font-bold">EXECUTING</span>
                    </>
                  ) : (
                    <>
                      <FaRocket className="w-4 h-4" />
                      <span className="font-bold">RUN CODE</span>
                    </>
                  )}
                </div>
              </button>

              {/* Theme Toggle - Cyber Style */}
              <button
                onClick={toggleDarkMode}
                className="gaming-card p-3 glow-effect hover:scale-110 transition-all duration-300 group"
                title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              >
                <div className="relative">
                  {darkMode ? (
                    <FaSun className="w-5 h-5 text-yellow-400 group-hover:animate-spin" />
                  ) : (
                    <FaMoon className="w-5 h-5 text-purple-400 group-hover:animate-pulse" />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-purple-400 rounded-full blur opacity-0 group-hover:opacity-50 transition duration-300"></div>
                </div>
              </button>
              
            </div>
          </div>
        </div>
        
        {/* Animated Bottom Border */}
        <div className="h-1 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 animate-pulse"></div>
      </div>
    </header>
  );
};

export default Header;
