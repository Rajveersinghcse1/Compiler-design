import React, { useRef, useEffect } from 'react';
import { FaTimes, FaTerminal, FaExclamationTriangle, FaCheckCircle, FaInfoCircle, FaMicrochip, FaCog, FaCopy } from 'react-icons/fa';

const OutputPanel = ({ output, isExecuting, darkMode, executionTime, onClear }) => {
  const outputRef = useRef(null);

  // Auto scroll to bottom when new output is added
  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight;
    }
  }, [output]);

  const handleCopyOutput = async () => {
    if (output) {
      try {
        await navigator.clipboard.writeText(output);
        console.log('Output copied to clipboard');
      } catch (err) {
        console.error('Failed to copy output:', err);
      }
    }
  };

  const hasOutput = output && output.trim().length > 0;
  const isError = output && (output.toLowerCase().includes('error') || output.toLowerCase().includes('traceback') || output.toLowerCase().includes('exception'));
  const isSuccess = hasOutput && !isError && !isExecuting;

  const getStatusInfo = () => {
    if (isExecuting) {
      return {
        icon: FaCog,
        color: 'text-yellow-400',
        bg: 'from-yellow-500/20 to-orange-500/20',
        border: 'border-yellow-500/50',
        status: 'PROCESSING',
        message: 'Executing quantum algorithms...'
      };
    }
    if (isError) {
      return {
        icon: FaExclamationTriangle,
        color: 'text-red-400',
        bg: 'from-red-500/20 to-pink-500/20',
        border: 'border-red-500/50',
        status: 'ERROR',
        message: 'System malfunction detected'
      };
    }
    if (isSuccess) {
      return {
        icon: FaCheckCircle,
        color: 'text-green-400',
        bg: 'from-green-500/20 to-blue-500/20',
        border: 'border-green-500/50',
        status: 'SUCCESS',
        message: 'Execution completed successfully'
      };
    }
    return {
      icon: FaInfoCircle,
      color: 'text-purple-400',
      bg: 'from-purple-500/20 to-cyan-500/20',
      border: 'border-purple-500/50',
      status: 'STANDBY',
      message: 'Ready for neural input'
    };
  };

  const statusInfo = getStatusInfo();
  const StatusIcon = statusInfo.icon;

  return (
    <div className="gaming-card glow-effect">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-purple-500/30">
        <div className="flex items-center space-x-3">
          {/* Icon and Title */}
          <div className="p-2 rounded-lg bg-gradient-to-br from-green-500 to-teal-500 glow-effect">
            <FaTerminal className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-bold gaming-title">OUTPUT STREAM</h3>
            <p className="text-sm text-green-300">System execution results</p>
          </div>
        </div>

        {/* Status and Controls */}
        <div className="flex items-center space-x-3">
          {/* Execution Time */}
          {executionTime && (
            <div className="px-2 py-1 rounded-full bg-cyan-900/30 border border-cyan-500/30">
              <span className="text-xs text-cyan-400 font-mono">{executionTime}ms</span>
            </div>
          )}

          {/* Status Badge */}
          <div className={`px-3 py-1 rounded-full bg-gradient-to-r ${statusInfo.bg} border ${statusInfo.border} flex items-center space-x-2`}>
            <StatusIcon className={`w-3 h-3 ${statusInfo.color} ${isExecuting ? 'animate-spin' : ''}`} />
            <span className={`text-xs font-bold ${statusInfo.color}`}>{statusInfo.status}</span>
          </div>

          {/* Copy Button */}
          {hasOutput && !isExecuting && (
            <button
              onClick={handleCopyOutput}
              className="p-2 rounded-lg bg-blue-900/30 hover:bg-blue-900/50 border border-blue-500/30 hover:border-blue-400 transition-all duration-300 group"
              title="Copy Output"
            >
              <FaCopy className="w-4 h-4 text-blue-400 group-hover:text-blue-300" />
            </button>
          )}

          {/* Clear Button */}
          {hasOutput && !isExecuting && onClear && (
            <button
              onClick={onClear}
              className="p-2 rounded-lg bg-red-900/30 hover:bg-red-900/50 border border-red-500/30 hover:border-red-400 transition-all duration-300 group"
              title="Clear Output"
            >
              <FaTimes className="w-4 h-4 text-red-400 group-hover:text-red-300" />
            </button>
          )}
        </div>
      </div>

      {/* Status Message */}
      <div className={`px-4 py-2 bg-gradient-to-r ${statusInfo.bg} border-b ${statusInfo.border}`}>
        <div className="flex items-center space-x-2">
          <FaMicrochip className={`w-3 h-3 ${statusInfo.color}`} />
          <span className={`text-xs ${statusInfo.color}`}>{statusInfo.message}</span>
        </div>
      </div>

      {/* Output Content */}
      <div className="relative h-64 overflow-hidden">
        {/* Matrix Rain Background */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="matrix-rain opacity-5"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 h-full p-4">
          {isExecuting ? (
            /* Loading State */
            <div className="flex flex-col items-center justify-center h-full space-y-4">
              <div className="relative">
                <div className="w-12 h-12 border-4 border-cyan-500/30 border-t-cyan-400 rounded-full animate-spin"></div>
                <div className="absolute inset-0 w-12 h-12 border-4 border-transparent border-t-purple-400 rounded-full animate-spin animate-reverse"></div>
              </div>
              <div className="text-center">
                <p className="text-cyan-400 font-bold mb-1">NEURAL PROCESSING</p>
                <p className="text-sm text-gray-400">Quantum algorithms executing...</p>
              </div>
              
              {/* Processing Animation */}
              <div className="flex space-x-1">
                {[...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"
                    style={{ animationDelay: `${i * 0.2}s` }}
                  ></div>
                ))}
              </div>
            </div>
          ) : hasOutput ? (
            /* Output Display */
            <div className="h-full">
              <pre
                ref={outputRef}
                className={`h-full overflow-auto scrollbar-gaming font-mono text-sm leading-relaxed p-3 rounded-lg whitespace-pre-wrap break-words ${
                  isError 
                    ? 'text-red-300 bg-red-900/20 border border-red-500/30' 
                    : 'text-green-300 bg-black/40 border border-green-500/30'
                }`}
                style={{ fontFamily: 'Monaco, Menlo, "Ubuntu Mono", monospace' }}
              >
                {output}
              </pre>
            </div>
          ) : (
            /* Empty State */
            <div className="flex flex-col items-center justify-center h-full text-center space-y-4">
              <div className="p-4 rounded-full bg-purple-900/30 border border-purple-500/30">
                <FaTerminal className="w-8 h-8 text-purple-400" />
              </div>
              <div>
                <p className="text-purple-300 font-bold mb-1">NO OUTPUT DETECTED</p>
                <p className="text-sm text-gray-400">Execute code to see results in the neural stream</p>
                <p className="text-xs text-gray-500 mt-1">Output, errors, and compilation messages will appear here</p>
              </div>
              
              {/* Pulsing Dots */}
              <div className="flex space-x-1">
                {[...Array(3)].map((_, i) => (
                  <div
                    key={i}
                    className="w-1 h-1 bg-purple-400 rounded-full animate-pulse"
                    style={{ animationDelay: `${i * 0.3}s` }}
                  ></div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Footer Stats */}
      <div className="p-3 border-t border-purple-500/30 bg-black/20">
        <div className="flex items-center justify-between text-xs text-gray-400">
          <div className="flex items-center space-x-4">
            <span>Lines: {output ? output.split('\n').length : 0}</span>
            <span>Chars: {output ? output.length : 0}</span>
            <span>Bytes: {output ? new Blob([output]).size : 0}</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className={`w-1 h-1 rounded-full animate-pulse ${
              isError ? 'bg-red-400' : isSuccess ? 'bg-green-400' : 'bg-purple-400'
            }`}></div>
            <span className={
              isError ? 'text-red-400' : isSuccess ? 'text-green-400' : 'text-purple-400'
            }>
              Stream {isError ? 'Error' : isSuccess ? 'Active' : 'Idle'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OutputPanel;
