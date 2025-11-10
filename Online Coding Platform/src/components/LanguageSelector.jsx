import React from 'react';
import { FaCode, FaChevronDown, FaMicrochip, FaLaptopCode } from 'react-icons/fa';

const LanguageSelector = ({ selectedLanguage, onLanguageChange, darkMode }) => {
  const languages = [
    { value: 'python', label: 'Python', icon: '🐍', color: 'from-green-400 to-blue-500' },
    { value: 'javascript', label: 'JavaScript', icon: '⚡', color: 'from-yellow-400 to-orange-500' },
    { value: 'cpp', label: 'C++', icon: '🔥', color: 'from-blue-400 to-purple-500' },
    { value: 'c', label: 'C', icon: '⚙️', color: 'from-gray-400 to-gray-600' },
    { value: 'java', label: 'Java', icon: '☕', color: 'from-red-400 to-orange-600' },
  ];

  const currentLang = languages.find(lang => lang.value === selectedLanguage);

  return (
    <div className="gaming-card p-6 glow-effect">
      <div className="flex items-center justify-between mb-4">
        
        {/* Title Section */}
        <div className="flex items-center space-x-3">
          <div className="p-2 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 glow-effect">
            <FaMicrochip className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-bold gaming-title">LANGUAGE CORE</h3>
            <p className="text-sm text-purple-300">Select your weapon of choice</p>
          </div>
        </div>

        {/* Current Language Display */}
        <div className="flex items-center space-x-2">
          <div className={`px-3 py-1 rounded-full bg-gradient-to-r ${currentLang?.color} text-white text-sm font-bold`}>
            {currentLang?.icon} {currentLang?.label}
          </div>
        </div>
      </div>

      {/* Language Grid */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        {languages.map((lang) => (
          <button
            key={lang.value}
            onClick={() => onLanguageChange(lang.value)}
            className={`relative group p-4 rounded-xl border-2 transition-all duration-300 ${
              selectedLanguage === lang.value
                ? 'border-purple-500 bg-gradient-to-br from-purple-900/50 to-pink-900/50 glow-effect'
                : 'border-gray-600 hover:border-purple-400 bg-gray-800/50 hover:bg-gray-700/50'
            }`}
          >
            {/* Background Effect */}
            <div className={`absolute inset-0 bg-gradient-to-r ${lang.color} opacity-0 group-hover:opacity-20 rounded-xl transition-opacity duration-300`}></div>
            
            {/* Content */}
            <div className="relative z-10 text-center">
              <div className="text-2xl mb-2">{lang.icon}</div>
              <div className="text-sm font-bold text-white">{lang.label}</div>
              {selectedLanguage === lang.value && (
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
              )}
            </div>

            {/* Hover Glow Effect */}
            <div className={`absolute inset-0 bg-gradient-to-r ${lang.color} opacity-0 group-hover:opacity-30 rounded-xl blur-lg transition-opacity duration-300 -z-10`}></div>
          </button>
        ))}
      </div>

      {/* Language Info Display */}
      <div className="mt-4 p-3 rounded-lg bg-black/40 border border-purple-500/30">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <FaLaptopCode className="w-4 h-4 text-purple-400" />
            <span className="text-sm text-purple-300">Runtime Info:</span>
          </div>
          <div className="text-sm font-mono text-green-400">
            {selectedLanguage === 'python' && 'Python 3.x • Interactive REPL'}
            {selectedLanguage === 'javascript' && 'Node.js • V8 Engine'}
            {selectedLanguage === 'cpp' && 'C++17 • GCC Compiler'}
            {selectedLanguage === 'c' && 'C99 • GCC Compiler'}
            {selectedLanguage === 'java' && 'Java 17 • JVM Runtime'}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LanguageSelector;
