import React, { useRef, useEffect } from 'react';
import Editor from '@monaco-editor/react';
import { FaCode, FaExpand, FaCompress, FaPlay, FaTerminal, FaMicrochip } from 'react-icons/fa';

const CodeEditor = ({ 
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

    // Configure gaming theme for Monaco
    monaco.editor.defineTheme('cyber-dark', {
      base: 'vs-dark',
      inherit: true,
      rules: [
        { token: 'comment', foreground: '#00ffff', fontStyle: 'italic' },
        { token: 'string', foreground: '#ff00ff' },
        { token: 'keyword', foreground: '#00ff00', fontStyle: 'bold' },
        { token: 'number', foreground: '#ffff00' },
        { token: 'type', foreground: '#ff8800' },
        { token: 'function', foreground: '#8888ff' },
        { token: 'variable', foreground: '#ffffff' },
      ],
      colors: {
        'editor.background': '#0a0a0a',
        'editor.foreground': '#00ffff',
        'editorCursor.foreground': '#ff00ff',
        'editor.lineHighlightBackground': '#001a1a',
        'editor.selectionBackground': '#003333',
        'editor.inactiveSelectionBackground': '#001a1a',
        'editorLineNumber.foreground': '#666666',
        'editorLineNumber.activeForeground': '#00ffff',
        'editor.wordHighlightBackground': '#004444',
        'editor.wordHighlightStrongBackground': '#005555',
        'editorBracketMatch.background': '#ff00ff33',
        'editorBracketMatch.border': '#ff00ff',
      }
    });

    // Apply the custom theme
    monaco.editor.setTheme('cyber-dark');

    // Add custom commands
    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.Enter, () => {
      console.log('Ctrl+Enter pressed - Run code');
    });
  }

  // Language mapping for Monaco Editor
  const monacoLanguageMap = {
    'python': 'python',
    'javascript': 'javascript',
    'cpp': 'cpp',
    'c': 'c',
    'java': 'java',
    'go': 'go',
    'rust': 'rust',
    'typescript': 'typescript'
  };

  const getLanguageDisplay = () => {
    const langMap = {
      'python': { name: 'Python', icon: '🐍', color: 'from-green-400 to-blue-500' },
      'javascript': { name: 'JavaScript', icon: '⚡', color: 'from-yellow-400 to-orange-500' },
      'cpp': { name: 'C++', icon: '🔥', color: 'from-blue-400 to-purple-500' },
      'c': { name: 'C', icon: '⚙️', color: 'from-gray-400 to-gray-600' },
      'java': { name: 'Java', icon: '☕', color: 'from-red-400 to-orange-600' },
    };
    return langMap[language] || { name: language, icon: '📝', color: 'from-gray-400 to-gray-600' };
  };

  const currentLang = getLanguageDisplay();

  return (
    <div className={`gaming-card glow-effect ${isFullscreen ? 'fixed inset-0 z-50' : ''}`}>
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-purple-500/30">
        <div className="flex items-center space-x-3">
          {/* Icon and Title */}
          <div className="p-2 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 glow-effect">
            <FaTerminal className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-bold gaming-title">CODE MATRIX</h3>
            <p className="text-sm text-cyan-300">Inject your algorithms</p>
          </div>
        </div>

        {/* Language Info and Controls */}
        <div className="flex items-center space-x-3">
          {/* Current Language Badge */}
          <div className={`px-3 py-1 rounded-full bg-gradient-to-r ${currentLang.color} text-white text-sm font-bold flex items-center space-x-1`}>
            <span>{currentLang.icon}</span>
            <span>{currentLang.name}</span>
          </div>

          {/* Status Indicator */}
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-xs text-green-400 font-mono">READY</span>
          </div>

          {/* Fullscreen Toggle */}
          <button
            onClick={onToggleFullscreen}
            className="p-2 rounded-lg bg-gray-800/50 hover:bg-gray-700/50 border border-purple-500/30 hover:border-purple-400 transition-all duration-300 group"
            title={isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
          >
            {isFullscreen ? (
              <FaCompress className="w-4 h-4 text-purple-400 group-hover:text-purple-300" />
            ) : (
              <FaExpand className="w-4 h-4 text-purple-400 group-hover:text-purple-300" />
            )}
          </button>
        </div>
      </div>

      {/* Editor Container */}
      <div className={`relative ${isFullscreen ? 'h-[calc(100vh-80px)]' : 'h-96'}`}>
        {/* Matrix Rain Effect Overlay */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="matrix-rain opacity-5"></div>
        </div>

        {/* Editor */}
        <Editor
          height="100%"
          language={monacoLanguageMap[language] || 'javascript'}
          value={value}
          onChange={onChange}
          onMount={handleEditorDidMount}
          options={{
            theme: 'cyber-dark',
            fontSize: 14,
            fontFamily: 'Consolas, "Courier New", monospace',
            minimap: { enabled: true },
            scrollBeyondLastLine: false,
            automaticLayout: true,
            cursorStyle: 'block',
            cursorBlinking: 'phase',
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
            rulers: [80],
            wordWrap: 'on',
            formatOnPaste: true,
            formatOnType: true,
            tabSize: 2,
            insertSpaces: true,
            quickSuggestions: {
              other: true,
              comments: true,
              strings: true
            },
            parameterHints: { enabled: true },
            autoClosingBrackets: 'always',
            autoClosingQuotes: 'always',
            autoSurround: 'languageDefined',
          }}
          loading={
            <div className="flex items-center justify-center h-full bg-black text-cyan-400">
              <div className="text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-cyan-400 mx-auto mb-2"></div>
                <p className="gaming-title">Initializing Neural Interface...</p>
              </div>
            </div>
          }
        />

        {/* Code Stats Overlay */}
        <div className="absolute bottom-2 right-2 bg-black/60 rounded-lg px-3 py-1 border border-cyan-500/30">
          <div className="flex items-center space-x-3 text-xs text-cyan-300">
            <span>Lines: {value ? value.split('\n').length : 0}</span>
            <span>•</span>
            <span>Chars: {value ? value.length : 0}</span>
            <span>•</span>
            <span className="flex items-center space-x-1">
              <FaMicrochip className="w-3 h-3" />
              <span>{currentLang.name}</span>
            </span>
          </div>
        </div>
      </div>

      {/* Footer with Shortcuts */}
      <div className="p-3 border-t border-purple-500/30 bg-black/20">
        <div className="flex items-center justify-between text-xs text-gray-400">
          <div className="flex items-center space-x-4">
            <span>Ctrl+S: Save</span>
            <span>Ctrl+/: Comment</span>
            <span>F11: Fullscreen</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-1 h-1 bg-cyan-400 rounded-full animate-pulse"></div>
            <span className="text-cyan-400">Neural Network Active</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CodeEditor;
