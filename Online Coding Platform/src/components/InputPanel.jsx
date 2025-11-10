import React from 'react';
import { FaKeyboard, FaTimes, FaUpload, FaDownload, FaMicrochip, FaDatabase } from 'react-icons/fa';

const InputPanel = ({ value, onChange, darkMode }) => {
  const handleClear = () => {
    onChange('');
  };

  const handleSampleData = () => {
    const samples = [
      "5\n1 2 3 4 5",
      "Hello World\n123\n456",
      "test\n42\n3.14",
      "Alice\nBob\nCharlie"
    ];
    const randomSample = samples[Math.floor(Math.random() * samples.length)];
    onChange(randomSample);
  };

  const lineCount = value ? value.split('\n').length : 0;
  const charCount = value ? value.length : 0;

  return (
    <div className="gaming-card glow-effect">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-purple-500/30">
        <div className="flex items-center space-x-3">
          {/* Icon and Title */}
          <div className="p-2 rounded-lg bg-gradient-to-br from-orange-500 to-red-500 glow-effect">
            <FaDatabase className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-bold gaming-title">INPUT STREAM</h3>
            <p className="text-sm text-orange-300">Feed the neural network</p>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center space-x-2">
          {/* Sample Data Button */}
          <button
            onClick={handleSampleData}
            className="px-3 py-1 rounded-lg bg-blue-900/30 hover:bg-blue-900/50 border border-blue-500/30 hover:border-blue-400 transition-all duration-300 group text-xs"
            title="Load Sample Data"
          >
            <span className="text-blue-400 group-hover:text-blue-300 font-bold">SAMPLE</span>
          </button>

          {/* Clear Button */}
          {value && (
            <button
              onClick={handleClear}
              className="p-2 rounded-lg bg-red-900/30 hover:bg-red-900/50 border border-red-500/30 hover:border-red-400 transition-all duration-300 group"
              title="Clear Input"
            >
              <FaTimes className="w-4 h-4 text-red-400 group-hover:text-red-300" />
            </button>
          )}
        </div>
      </div>

      {/* Input Stats */}
      <div className="px-4 py-2 bg-gradient-to-r from-orange-500/10 to-red-500/10 border-b border-orange-500/20">
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center space-x-2">
            <FaMicrochip className="w-3 h-3 text-orange-400" />
            <span className="text-orange-400">Data buffer ready for injection</span>
          </div>
          <div className="flex items-center space-x-4 text-gray-400">
            <span>Lines: {lineCount}</span>
            <span>Chars: {charCount}</span>
          </div>
        </div>
      </div>

      {/* Input Area */}
      <div className="p-4">
        <div className="relative">
          {/* Matrix Rain Background */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-lg">
            <div className="matrix-rain opacity-5"></div>
          </div>

          {/* Textarea */}
          <textarea
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Enter neural input data (stdin)..."
            className="relative z-10 w-full h-32 px-4 py-3 bg-black/40 border border-orange-500/30 rounded-lg text-orange-100 placeholder-orange-400/50 font-mono text-sm leading-relaxed resize-none focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-400/20 transition-all duration-300 scrollbar-gaming"
            style={{ fontFamily: 'Monaco, Menlo, "Ubuntu Mono", monospace' }}
          />

          {/* Input Indicator */}
          <div className="absolute top-2 right-2">
            <div className={`w-2 h-2 rounded-full ${value ? 'bg-green-400 animate-pulse' : 'bg-gray-600'}`}></div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="p-3 border-t border-purple-500/30 bg-black/20">
        <div className="flex items-center justify-between text-xs text-gray-400">
          <div className="flex items-center space-x-2">
            <FaKeyboard className="w-3 h-3 text-orange-400" />
            <span className="text-orange-400">This data will be injected via stdin</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className={`w-1 h-1 rounded-full ${value ? 'bg-green-400 animate-pulse' : 'bg-gray-600'}`}></div>
            <span className={value ? 'text-green-400' : 'text-gray-400'}>
              Buffer {value ? 'Loaded' : 'Empty'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InputPanel;
