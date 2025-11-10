import React from 'react';
import { FaRocket, FaBolt, FaMicrochip } from 'react-icons/fa';

const UltraHeader = ({ darkMode, toggleDarkMode, isExecuting, onRunCode, executionTime }) => {
  return (
    <header className="glass-card m-6 p-6 fade-in">
      <div className="flex items-center justify-between">
        {/* Ultra-Modern Branding */}
        <div className="flex items-center space-x-4">
          <div className="relative">
            <div className="w-12 h-12 bg-gradient-to-br from-cyan-400 to-purple-600 rounded-xl flex items-center justify-center pulse-glow">
              <FaMicrochip className="w-6 h-6 text-white" />
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

export default UltraHeader;
