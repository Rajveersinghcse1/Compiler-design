import React, { useState, useEffect } from 'react';
import UltraCodeEditor from './components/UltraCodeEditor';
import UltraOutputPanel from './components/UltraOutputPanel';
import UltraHeader from './components/UltraHeader';
import UltraLanguageSelector from './components/UltraLanguageSelector';
import UltraInputPanel from './components/UltraInputPanel';
import { executeCode } from './services/api';
import './ultra-modern.css';

// Sample code templates for different languages
const codeTemplates = {
  python: `# Python - AI & Data Science
import numpy as np
import pandas as pd

def analyze_data():
    # Generate sample data
    data = np.random.randn(100, 3)
    df = pd.DataFrame(data, columns=['A', 'B', 'C'])
    
    print("Data Analysis Results:")
    print(f"Mean: {df.mean().round(3)}")
    print(f"Std:  {df.std().round(3)}")
    
    return df

# Execute analysis
result = analyze_data()
print(f"\\nShape: {result.shape}")`,

  javascript: `// JavaScript - Modern Web Development
const analyzePerformance = async () => {
  const startTime = performance.now();
  
  // Simulate async operations
  console.log('🚀 Starting performance analysis...');
  
  // Generate sample data
  const data = Array.from({length: 1000}, (_, i) => ({
    id: i,
    value: Math.random() * 100,
    timestamp: Date.now() + i
  }));
  
  const endTime = performance.now();
  
  console.log('📊 Performance Analysis Complete:');
  console.log(\`⏱️  Execution time: \${(endTime - startTime).toFixed(2)}ms\`);
  console.log(\`📈 Data processed: \${data.length} records\`);
  
  return { performance: endTime - startTime, data };
};

// Execute
analyzePerformance().then(result => {
  console.log('✅ Analysis complete!');
});`,

  cpp: `#include <iostream>
#include <vector>
#include <algorithm>
#include <chrono>
using namespace std;
using namespace chrono;

int main() {
    auto start = high_resolution_clock::now();
    
    cout << "🚀 C++ Performance Benchmark:" << endl;
    cout << "=============================" << endl;
    
    vector<int> data(100000);
    iota(data.begin(), data.end(), 1);
    
    // Parallel sort for performance
    sort(data.begin(), data.end(), greater<int>());
    
    auto end = high_resolution_clock::now();
    auto duration = duration_cast<microseconds>(end - start);
    
    cout << "📊 Sorted " << data.size() << " elements" << endl;
    cout << "⏱️  Time: " << duration.count() << " microseconds" << endl;
    cout << "✅ Peak performance achieved!" << endl;
    
    return 0;
}`,

  c: `#include <stdio.h>
#include <stdlib.h>
#include <time.h>

int main() {
    clock_t start = clock();
    
    printf("🔧 C System Analysis\\n");
    printf("==================\\n");
    
    // Process data
    int data[1000];
    for(int i = 0; i < 1000; i++) {
        data[i] = rand() % 100;
    }
    
    double sum = 0.0;
    for(int i = 0; i < 1000; i++) {
        sum += data[i];
    }
    
    clock_t end = clock();
    double cpu_time = ((double)(end - start)) / CLOCKS_PER_SEC;
    
    printf("📊 Processed: %d data points\\n", 1000);
    printf("📈 Average: %.2f\\n", sum / 1000);
    printf("⏱️  CPU Time: %.6f seconds\\n", cpu_time);
    printf("✅ Analysis complete!\\n");
    
    return 0;
}`,

  java: `public class Main {
    public static void main(String[] args) {
        long startTime = System.nanoTime();
        
        System.out.println("☕ Java Enterprise Analysis");
        System.out.println("==========================");
        
        // Process data
        int[] data = new int[1000];
        for(int i = 0; i < data.length; i++) {
            data[i] = (int)(Math.random() * 100);
        }
        
        double sum = 0;
        for(int value : data) {
            sum += value;
        }
        
        long endTime = System.nanoTime();
        double duration = (endTime - startTime) / 1_000_000.0;
        
        System.out.println("📊 Processed: " + data.length + " elements");
        System.out.println("📈 Average: " + (sum / data.length));
        System.out.println("⏱️  Duration: " + String.format("%.2f", duration) + "ms");
        System.out.println("✅ Enterprise analysis complete!");
    }
}`
};

function App() {
  const [darkMode, setDarkMode] = useState(true);
  const [selectedLanguage, setSelectedLanguage] = useState('python');
  const [code, setCode] = useState(codeTemplates.python);
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [isExecuting, setIsExecuting] = useState(false);
  const [executionTime, setExecutionTime] = useState(null);

  // Handle language change
  const handleLanguageChange = (language) => {
    setSelectedLanguage(language);
    setCode(codeTemplates[language] || '// Start coding...');
    setOutput('');
  };

  // Handle code execution
  const handleRunCode = async () => {
    if (!code.trim()) {
      setOutput('Error: Please enter some code to execute.');
      return;
    }

    setIsExecuting(true);
    setOutput('Executing code...');
    const startTime = Date.now();

    try {
      const result = await executeCode(selectedLanguage, code, input);
      const endTime = Date.now();
      setExecutionTime(endTime - startTime);

      if (result.success) {
        let outputText = '';
        
        if (result.compile_output) {
          outputText += `Compilation Output:\n${result.compile_output}\n\n`;
        }
        
        if (result.compile_error) {
          outputText += `Compilation Error:\n${result.compile_error}\n\n`;
        }
        
        if (result.output) {
          outputText += `Output:\n${result.output}`;
        }
        
        if (result.error) {
          outputText += `\nError:\n${result.error}`;
        }
        
        if (!outputText.trim()) {
          outputText = 'Code executed successfully with no output.';
        }
        
        setOutput(outputText);
      } else {
        setOutput(`Error: ${result.error || 'Unknown error occurred'}`);
      }
    } catch (error) {
      setOutput(`Network Error: ${error.message}\nPlease ensure the backend server is running on http://localhost:5000`);
      setExecutionTime(null);
    } finally {
      setIsExecuting(false);
    }
  };

  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(135deg, #0a0b14 0%, #1e293b 100%)' }}>
      {/* Ultra-Modern Grid Background */}
      <div className="grid-bg"></div>
      
      {/* Header */}
      <UltraHeader 
        darkMode={darkMode} 
        toggleDarkMode={() => setDarkMode(!darkMode)}
        isExecuting={isExecuting}
        onRunCode={handleRunCode}
        executionTime={executionTime}
      />

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-6 pb-8 space-y-8">
        {/* Language Selector */}
        <UltraLanguageSelector 
          selectedLanguage={selectedLanguage}
          onLanguageChange={handleLanguageChange}
          darkMode={darkMode}
        />

        {/* Ultra-Modern Layout */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Code Editor (2/3 width) */}
          <div className="xl:col-span-2">
            <UltraCodeEditor
              language={selectedLanguage}
              value={code}
              onChange={setCode}
              darkMode={darkMode}
            />
          </div>

          {/* Sidebar (1/3 width) */}
          <div className="xl:col-span-1 space-y-6">
            {/* Input Panel */}
            <UltraInputPanel
              value={input}
              onChange={setInput}
              darkMode={darkMode}
            />

            {/* Output Panel */}
            <UltraOutputPanel
              output={output}
              isExecuting={isExecuting}
              darkMode={darkMode}
              executionTime={executionTime}
              onClear={() => setOutput('')}
            />
          </div>
        </div>

        {/* Ultra-Modern Notifications */}
        {isExecuting && (
          <div className="notification">
            <div className="flex items-center space-x-3">
              <div className="w-6 h-6 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin"></div>
              <div>
                <p className="text-cyan-400 font-semibold text-sm">Processing Code</p>
                <p className="text-xs text-gray-300">AI-powered execution in progress...</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
