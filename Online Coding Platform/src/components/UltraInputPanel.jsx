import React from 'react';
import { FaDatabase, FaTimes, FaUpload, FaMicrochip } from 'react-icons/fa';

const UltraInputPanel = ({ value, onChange, darkMode }) => {
  const handleClear = () => {
    onChange('');
  };

  const handleSampleData = () => {
    const samples = [
      "5\n1 2 3 4 5",
      "Alice\nBob\nCharlie\nDiana",
      "test input\n42\n3.14159",
      "Hello World\n123\n456\n789"
    ];
    const randomSample = samples[Math.floor(Math.random() * samples.length)];
    onChange(randomSample);
  };

  const lineCount = value ? value.split('\n').length : 0;
  const charCount = value ? value.length : 0;

  return (
    <div className="glass-card p-6 fade-in">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg flex items-center justify-center pulse-glow">
            <FaDatabase className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="heading-primary text-lg">Input Stream</h3>
            <p className="heading-secondary">Program input data</p>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center space-x-2">
          <button
            onClick={handleSampleData}
            className="px-3 py-1 text-xs bg-blue-500/20 border border-blue-500/30 rounded-lg text-blue-400 hover:bg-blue-500/30 transition-all duration-300"
          >
            Sample
          </button>
          
          {value && (
            <button
              onClick={handleClear}
              className="btn-primary p-2"
              title="Clear Input"
            >
              <FaTimes className="w-3 h-3" />
            </button>
          )}
        </div>
      </div>

      {/* Input Area */}
      <div className="mb-4">
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Enter program input (stdin)..."
          className="input-field h-32 custom-scrollbar resize-none"
          style={{ fontFamily: 'JetBrains Mono, Consolas, Monaco, monospace' }}
        />
      </div>

      {/* Stats */}
      <div className="flex items-center justify-between text-xs text-gray-400">
        <div className="flex items-center space-x-2">
          <FaMicrochip className="w-3 h-3 text-orange-400" />
          <span className="text-orange-400">Data buffer ready</span>
        </div>
        <div className="flex items-center space-x-4">
          <span>Lines: {lineCount}</span>
          <span>Chars: {charCount}</span>
          <div className="flex items-center space-x-1">
            <div className={`w-2 h-2 rounded-full ${value ? 'bg-green-400 animate-pulse' : 'bg-gray-600'}`}></div>
            <span className={value ? 'text-green-400' : 'text-gray-400'}>
              {value ? 'Loaded' : 'Empty'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UltraInputPanel;
