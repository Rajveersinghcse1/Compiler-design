import React from 'react';
import { FaMicrochip, FaCode } from 'react-icons/fa';

const UltraLanguageSelector = ({ selectedLanguage, onLanguageChange, darkMode }) => {
  const languages = [
    { value: 'python', label: 'Python', icon: '🐍', color: 'from-green-400 to-emerald-600', desc: 'AI & Data Science' },
    { value: 'javascript', label: 'JavaScript', icon: '⚡', color: 'from-yellow-400 to-orange-500', desc: 'Web Development' },
    { value: 'cpp', label: 'C++', icon: '🚀', color: 'from-blue-400 to-purple-500', desc: 'High Performance' },
    { value: 'c', label: 'C', icon: '⚙️', color: 'from-gray-400 to-gray-600', desc: 'System Programming' },
    { value: 'java', label: 'Java', icon: '☕', color: 'from-red-400 to-orange-600', desc: 'Enterprise Apps' },
  ];

  const currentLang = languages.find(lang => lang.value === selectedLanguage);

  return (
    <div className="glass-card p-6 fade-in">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center pulse-glow">
            <FaCode className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="heading-primary text-lg">Language Runtime</h3>
            <p className="heading-secondary">Select your development environment</p>
          </div>
        </div>

        {/* Current Language Display */}
        <div className={`px-4 py-2 rounded-xl bg-gradient-to-r ${currentLang?.color} text-white font-semibold flex items-center space-x-2`}>
          <span className="text-lg">{currentLang?.icon}</span>
          <span>{currentLang?.label}</span>
        </div>
      </div>

      {/* Language Grid */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {languages.map((lang) => (
          <button
            key={lang.value}
            onClick={() => onLanguageChange(lang.value)}
            className={`relative group p-4 rounded-xl transition-all duration-300 ${
              selectedLanguage === lang.value
                ? 'bg-gradient-to-br from-cyan-500/20 to-purple-500/20 border-2 border-cyan-400'
                : 'bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-gray-600 hover:border-purple-400'
            }`}
          >
            {/* Background Glow */}
            <div className={`absolute inset-0 bg-gradient-to-r ${lang.color} opacity-0 group-hover:opacity-20 rounded-xl transition-opacity duration-300`}></div>
            
            {/* Content */}
            <div className="relative z-10 text-center">
              <div className="text-2xl mb-2">{lang.icon}</div>
              <div className="font-semibold text-white mb-1">{lang.label}</div>
              <div className="text-xs text-gray-400">{lang.desc}</div>
              
              {/* Active Indicator */}
              {selectedLanguage === lang.value && (
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-cyan-400 rounded-full animate-pulse"></div>
              )}
            </div>

            {/* Hover Glow Effect */}
            <div className={`absolute inset-0 bg-gradient-to-r ${lang.color} opacity-0 group-hover:opacity-30 rounded-xl blur-md transition-opacity duration-300 -z-10`}></div>
          </button>
        ))}
      </div>

      {/* Runtime Info */}
      <div className="mt-6 p-4 rounded-xl bg-black/40 border border-purple-500/30">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <FaMicrochip className="w-4 h-4 text-purple-400" />
            <span className="text-sm text-purple-300 font-medium">Runtime Environment:</span>
          </div>
          <div className="text-sm font-mono text-cyan-400">
            {selectedLanguage === 'python' && 'Python 3.11 • Advanced ML Libraries'}
            {selectedLanguage === 'javascript' && 'Node.js 18 • Modern ES2023'}
            {selectedLanguage === 'cpp' && 'C++20 • GCC 12 Optimized'}
            {selectedLanguage === 'c' && 'C11 • GCC 12 Standard'}
            {selectedLanguage === 'java' && 'OpenJDK 17 • Enterprise Ready'}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UltraLanguageSelector;
