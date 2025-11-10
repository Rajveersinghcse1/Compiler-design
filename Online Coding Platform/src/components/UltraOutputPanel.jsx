import React, { useRef, useEffect } from 'react';
import { FaTerminal, FaCheckCircle, FaExclamationTriangle, FaCopy, FaTimes, FaBolt } from 'react-icons/fa';

const UltraOutputPanel = ({ output, isExecuting, darkMode, executionTime, onClear }) => {
  const outputRef = useRef(null);

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
        icon: FaBolt,
        color: 'text-yellow-400',
        bg: 'from-yellow-500/20 to-orange-500/20',
        border: 'border-yellow-500/30',
        status: 'Processing'
      };
    }
    if (isError) {
      return {
        icon: FaExclamationTriangle,
        color: 'text-red-400',
        bg: 'from-red-500/20 to-pink-500/20',
        border: 'border-red-500/30',
        status: 'Error'
      };
    }
    if (isSuccess) {
      return {
        icon: FaCheckCircle,
        color: 'text-green-400',
        bg: 'from-green-500/20 to-emerald-500/20',
        border: 'border-green-500/30',
        status: 'Success'
      };
    }
    return {
      icon: FaTerminal,
      color: 'text-purple-400',
      bg: 'from-purple-500/20 to-cyan-500/20',
      border: 'border-purple-500/30',
      status: 'Ready'
    };
  };

  const statusInfo = getStatusInfo();
  const StatusIcon = statusInfo.icon;

  return (
    <div className="glass-card fade-in">
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-purple-500/20">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-teal-500 rounded-lg flex items-center justify-center pulse-glow">
            <FaTerminal className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="heading-primary text-lg">Output Console</h3>
            <p className="heading-secondary">Execution results</p>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          {/* Execution Time */}
          {executionTime && (
            <div className="status-badge status-online">
              <FaBolt className="w-3 h-3" />
              <span>{executionTime}ms</span>
            </div>
          )}

          {/* Status Badge */}
          <div className={`status-badge ${isError ? 'status-error' : isSuccess ? 'status-online' : isExecuting ? 'status-processing' : 'status-online'}`}>
            <StatusIcon className={`w-3 h-3 ${isExecuting ? 'animate-spin' : ''}`} />
            <span>{statusInfo.status}</span>
          </div>

          {/* Controls */}
          {hasOutput && !isExecuting && (
            <>
              <button
                onClick={handleCopyOutput}
                className="btn-primary p-2"
                title="Copy Output"
              >
                <FaCopy className="w-3 h-3" />
              </button>
              
              {onClear && (
                <button
                  onClick={onClear}
                  className="btn-primary p-2"
                  title="Clear Output"
                >
                  <FaTimes className="w-3 h-3" />
                </button>
              )}
            </>
          )}
        </div>
      </div>

      {/* Output Content */}
      <div className="relative h-80">
        {isExecuting ? (
          /* Loading State */
          <div className="flex flex-col items-center justify-center h-full space-y-4">
            <div className="relative">
              <div className="w-12 h-12 border-4 border-cyan-500/30 border-t-cyan-400 rounded-full animate-spin"></div>
              <div className="absolute inset-0 w-12 h-12 border-4 border-transparent border-t-purple-400 rounded-full animate-spin animate-reverse"></div>
            </div>
            <div className="text-center">
              <p className="text-cyan-400 font-semibold mb-1">Processing</p>
              <p className="text-sm text-gray-400">AI-powered execution in progress...</p>
            </div>
          </div>
        ) : hasOutput ? (
          /* Output Display */
          <div className="h-full p-6">
            <pre
              ref={outputRef}
              className={`h-full overflow-auto custom-scrollbar font-mono text-sm leading-relaxed p-4 rounded-lg whitespace-pre-wrap break-words ${
                isError 
                  ? 'text-red-300 bg-red-500/10 border border-red-500/20' 
                  : 'text-green-300 bg-green-500/10 border border-green-500/20'
              }`}
              style={{ fontFamily: 'JetBrains Mono, Consolas, Monaco, monospace' }}
            >
              {output}
            </pre>
          </div>
        ) : (
          /* Empty State */
          <div className="flex flex-col items-center justify-center h-full text-center space-y-4">
            <div className="w-16 h-16 bg-purple-500/20 rounded-full flex items-center justify-center">
              <FaTerminal className="w-8 h-8 text-purple-400" />
            </div>
            <div>
              <p className="text-purple-300 font-semibold mb-1">No Output</p>
              <p className="text-sm text-gray-400">Execute code to see results here</p>
            </div>
          </div>
        )}
      </div>

      {/* Footer Stats */}
      {hasOutput && (
        <div className="px-6 py-4 border-t border-purple-500/20 bg-black/20">
          <div className="flex items-center justify-between text-xs text-gray-400">
            <div className="flex items-center space-x-4">
              <span>Lines: {output.split('\n').length}</span>
              <span>Chars: {output.length}</span>
              <span>Bytes: {new Blob([output]).size}</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className={`w-1 h-1 rounded-full animate-pulse ${
                isError ? 'bg-red-400' : 'bg-green-400'
              }`}></div>
              <span className={isError ? 'text-red-400' : 'text-green-400'}>
                {isError ? 'Error Stream' : 'Output Stream'}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UltraOutputPanel;
