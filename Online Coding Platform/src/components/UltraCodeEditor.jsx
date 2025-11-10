import React, { useRef, useEffect } from 'react';
import Editor from '@monaco-editor/react';
import { FaTerminal, FaExpand, FaCompress, FaCode, FaCircle } from 'react-icons/fa';

const UltraCodeEditor = ({ 
  language, 
  value, 
  onChange, 
  darkMode = true,
  isFullscreen = false,
  onToggleFullscreen = () => {}
}) => {
  const editorRef = useRef(null);

  function handleEditorDidMount(editor, monaco) {
    editorRef.current = editor;

    // Configure ultra-modern theme for Monaco
    monaco.editor.defineTheme('ultra-dark', {
      base: 'vs-dark',
      inherit: true,
      rules: [
        { token: 'comment', foreground: '#6366f1', fontStyle: 'italic' },
        { token: 'string', foreground: '#10b981' },
        { token: 'keyword', foreground: '#06b6d4', fontStyle: 'bold' },
        { token: 'number', foreground: '#f59e0b' },
        { token: 'type', foreground: '#8b5cf6' },
        { token: 'function', foreground: '#ec4899' },
        { token: 'variable', foreground: '#f3f4f6' },
      ],
      colors: {
        'editor.background': '#0a0b14',
        'editor.foreground': '#f3f4f6',
        'editorCursor.foreground': '#00d9ff',
        'editor.lineHighlightBackground': '#151826',
        'editor.selectionBackground': '#1e293b',
        'editor.inactiveSelectionBackground': '#151826',
        'editorLineNumber.foreground': '#64748b',
        'editorLineNumber.activeForeground': '#00d9ff',
        'editor.wordHighlightBackground': '#1e293b',
        'editor.wordHighlightStrongBackground': '#334155',
        'editorBracketMatch.background': '#7c3aed33',
        'editorBracketMatch.border': '#7c3aed',
      }
    });

    monaco.editor.setTheme('ultra-dark');

    // Add modern commands
    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.Enter, () => {
      console.log('Execute code shortcut');
    });
  }

  const monacoLanguageMap = {
    'python': 'python',
    'javascript': 'javascript',
    'cpp': 'cpp',
    'c': 'c',
    'java': 'java',
  };

  const getLanguageInfo = () => {
    const langMap = {
      'python': { name: 'Python', icon: '🐍', color: 'from-green-400 to-emerald-600' },
      'javascript': { name: 'JavaScript', icon: '⚡', color: 'from-yellow-400 to-orange-500' },
      'cpp': { name: 'C++', icon: '🚀', color: 'from-blue-400 to-purple-500' },
      'c': { name: 'C', icon: '⚙️', color: 'from-gray-400 to-gray-600' },
      'java': { name: 'Java', icon: '☕', color: 'from-red-400 to-orange-600' },
    };
    return langMap[language] || { name: language, icon: '📝', color: 'from-gray-400 to-gray-600' };
  };

  const langInfo = getLanguageInfo();

  return (
    <div className={`glass-card fade-in ${isFullscreen ? 'fixed inset-4 z-50' : ''}`}>
      {/* Ultra-Modern Header */}
      <div className="flex items-center justify-between p-6 border-b border-purple-500/20">
        <div className="flex items-center space-x-4">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center pulse-glow">
            <FaTerminal className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="heading-primary text-lg">Code Editor</h3>
            <p className="heading-secondary">Advanced development interface</p>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          {/* Language Badge */}
          <div className={`px-3 py-1 rounded-lg bg-gradient-to-r ${langInfo.color} text-white text-sm font-semibold flex items-center space-x-1`}>
            <span>{langInfo.icon}</span>
            <span>{langInfo.name}</span>
          </div>

          {/* Status */}
          <div className="status-badge status-online">
            <FaCircle className="w-2 h-2" />
            <span>Ready</span>
          </div>

          {/* Fullscreen Toggle */}
          <button
            onClick={onToggleFullscreen}
            className="btn-primary p-2"
            title={isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
          >
            {isFullscreen ? (
              <FaCompress className="w-4 h-4" />
            ) : (
              <FaExpand className="w-4 h-4" />
            )}
          </button>
        </div>
      </div>

      {/* Editor Container */}
      <div className={`relative ${isFullscreen ? 'h-[calc(100vh-160px)]' : 'h-96'}`}>
        <Editor
          height="100%"
          language={monacoLanguageMap[language] || 'javascript'}
          value={value}
          onChange={onChange}
          onMount={handleEditorDidMount}
          options={{
            theme: 'ultra-dark',
            fontSize: 14,
            fontFamily: 'JetBrains Mono, Consolas, Monaco, monospace',
            fontLigatures: true,
            minimap: { enabled: true, scale: 2 },
            scrollBeyondLastLine: false,
            automaticLayout: true,
            cursorStyle: 'line',
            cursorBlinking: 'smooth',
            renderLineHighlight: 'all',
            bracketPairColorization: { enabled: true },
            guides: {
              bracketPairs: true,
              bracketPairsHorizontal: true,
              highlightActiveIndentation: true
            },
            glyphMargin: true,
            folding: true,
            lineNumbers: 'on',
            rulers: [80, 120],
            wordWrap: 'on',
            formatOnPaste: true,
            formatOnType: true,
            tabSize: 2,
            insertSpaces: true,
            quickSuggestions: { other: true, comments: true, strings: true },
            parameterHints: { enabled: true },
            autoClosingBrackets: 'always',
            autoClosingQuotes: 'always',
            smoothScrolling: true,
            padding: { top: 16 },
          }}
          loading={
            <div className="flex items-center justify-center h-full bg-gray-900/50 text-cyan-400">
              <div className="text-center">
                <div className="w-8 h-8 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                <p className="heading-secondary">Initializing Editor...</p>
              </div>
            </div>
          }
        />

        {/* Code Stats Overlay */}
        <div className="absolute bottom-4 right-4 px-3 py-2 bg-black/60 backdrop-blur-sm rounded-lg border border-cyan-500/30">
          <div className="flex items-center space-x-3 text-xs text-cyan-300">
            <span>Lines: {value ? value.split('\n').length : 0}</span>
            <span>•</span>
            <span>Chars: {value ? value.length : 0}</span>
            <span>•</span>
            <span>{langInfo.name}</span>
          </div>
        </div>
      </div>

      {/* Ultra-Modern Footer */}
      <div className="px-6 py-4 border-t border-purple-500/20 bg-black/20">
        <div className="flex items-center justify-between text-xs text-gray-400">
          <div className="flex items-center space-x-4">
            <span>Ctrl+Enter: Execute</span>
            <span>Ctrl+/: Comment</span>
            <span>F11: Fullscreen</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-1 h-1 bg-cyan-400 rounded-full animate-pulse"></div>
            <span className="text-cyan-400">AI Assistant Active</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UltraCodeEditor;
