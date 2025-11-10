import React, { useState, useEffect } from 'react';
import UltraCodeEditor from './components/UltraCodeEditor';
import OutputPanel from './components/OutputPanel';
import UltraHeader from './components/UltraHeader';
import UltraLanguageSelector from './components/UltraLanguageSelector';
import InputPanel from './components/InputPanel';
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
  const data = await Promise.all([
    fetch('/api/users').then(r => r.json()),
    fetch('/api/posts').then(r => r.json())
  ]);
  
  const endTime = performance.now();
  
  console.log('🚀 Performance Analysis:');
  console.log(\`⏱️  Execution time: \${(endTime - startTime).toFixed(2)}ms\`);
  console.log(\`📊 Data loaded: \${data.length} endpoints\`);
  
  return { performance: endTime - startTime, data };
};

// Execute
analyzePerformance().then(result => {
  console.log('✅ Analysis complete:', result);
});`,

  cpp: `#include <iostream>
#include <vector>
#include <algorithm>
#include <chrono>
using namespace std;
using namespace chrono;

class PerformanceAnalyzer {
public:
    static void benchmark() {
        auto start = high_resolution_clock::now();
        
        vector<int> data(1000000);
        iota(data.begin(), data.end(), 1);
        
        // Parallel sort for performance
        sort(data.begin(), data.end(), greater<int>());
        
        auto end = high_resolution_clock::now();
        auto duration = duration_cast<microseconds>(end - start);
        
        cout << "🚀 C++ Performance Benchmark:" << endl;
        cout << "📊 Sorted " << data.size() << " elements" << endl;
        cout << "⏱️  Time: " << duration.count() << " microseconds" << endl;
        cout << "✅ Peak performance achieved!" << endl;
    }
};

int main() {
    PerformanceAnalyzer::benchmark();
    return 0;
}`,

  c: `#include <stdio.h>
#include <stdlib.h>
#include <time.h>

typedef struct {
    int id;
    double value;
} DataPoint;

void analyze_system() {
    clock_t start = clock();
    
    printf("🔧 C System Analysis\\n");
    printf("==================\\n");
    
    // Allocate and process data
    DataPoint* data = malloc(1000 * sizeof(DataPoint));
    
    for(int i = 0; i < 1000; i++) {
        data[i].id = i;
        data[i].value = (double)rand() / RAND_MAX;
    }
    
    double sum = 0.0;
    for(int i = 0; i < 1000; i++) {
        sum += data[i].value;
    }
    
    clock_t end = clock();
    double cpu_time = ((double)(end - start)) / CLOCKS_PER_SEC;
    
    printf("📊 Processed: %d data points\\n", 1000);
    printf("📈 Average: %.6f\\n", sum / 1000);
    printf("⏱️  CPU Time: %.6f seconds\\n", cpu_time);
    printf("✅ System analysis complete!\\n");
    
    free(data);
}

int main() {
    analyze_system();
    return 0;
}`,

  java: `public class EnterpriseAnalyzer {
    
    public static class DataProcessor {
        private String name;
        private double efficiency;
        
        public DataProcessor(String name, double efficiency) {
            this.name = name;
            this.efficiency = efficiency;
        }
        
        public void process() {
            long startTime = System.nanoTime();
            
            // Simulate enterprise processing
            for(int i = 0; i < 1000000; i++) {
                Math.sqrt(i * efficiency);
            }
            
            long endTime = System.nanoTime();
            double duration = (endTime - startTime) / 1_000_000.0;
            
            System.out.println("🏢 " + name + " Processing Complete");
            System.out.println("⏱️  Duration: " + String.format("%.2f", duration) + "ms");
            System.out.println("📊 Efficiency: " + (efficiency * 100) + "%");
        }
    }
    
    public static void main(String[] args) {
        System.out.println("☕ Java Enterprise Analysis");
        System.out.println("==========================");
        
        DataProcessor processor = new DataProcessor("Enterprise Core", 0.95);
        processor.process();
        
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
            <InputPanel
              value={input}
              onChange={setInput}
              darkMode={darkMode}
            />

            {/* Output Panel */}
            <OutputPanel
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

// Sample code templates for different languages
const codeTemplates = {
  python: `# Python Example
print("Hello, World!")

# Try some basic operations
name = input("Enter your name: ")
print(f"Hello, {name}!")

# Basic math
numbers = [1, 2, 3, 4, 5]
sum_numbers = sum(numbers)
print(f"Sum of {numbers} = {sum_numbers}")`,

  javascript: `// JavaScript Example
console.log("Hello, World!");

// Try some basic operations
const numbers = [1, 2, 3, 4, 5];
const sum = numbers.reduce((a, b) => a + b, 0);
console.log(\`Sum of [\${numbers.join(', ')}] = \${sum}\`);

// Function example
function greet(name) {
    return \`Hello, \${name}!\`;
}

console.log(greet("Developer"));`,

  cpp: `#include <iostream>
#include <vector>
#include <numeric>
using namespace std;

int main() {
    cout << "Hello, World!" << endl;
    
    // Basic operations
    vector<int> numbers = {1, 2, 3, 4, 5};
    int sum = accumulate(numbers.begin(), numbers.end(), 0);
    
    cout << "Sum of numbers: " << sum << endl;
    
    // Input example
    string name;
    cout << "Enter your name: ";
    getline(cin, name);
    cout << "Hello, " << name << "!" << endl;
    
    return 0;
}`,

  c: `#include <stdio.h>
#include <string.h>

int main() {
    printf("Hello, World!\\n");
    
    // Basic operations
    int numbers[] = {1, 2, 3, 4, 5};
    int sum = 0;
    int size = sizeof(numbers) / sizeof(numbers[0]);
    
    for(int i = 0; i < size; i++) {
        sum += numbers[i];
    }
    
    printf("Sum of numbers: %d\\n", sum);
    
    // Input example
    char name[100];
    printf("Enter your name: ");
    fgets(name, sizeof(name), stdin);
    
    // Remove newline from fgets
    name[strcspn(name, "\\n")] = 0;
    
    printf("Hello, %s!\\n", name);
    
    return 0;
}`,

  java: `public class Main {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
        
        // Basic operations
        int[] numbers = {1, 2, 3, 4, 5};
        int sum = 0;
        
        for(int num : numbers) {
            sum += num;
        }
        
        System.out.println("Sum of numbers: " + sum);
        
        // Input example (commented out for demo)
        // Scanner scanner = new Scanner(System.in);
        // System.out.print("Enter your name: ");
        // String name = scanner.nextLine();
        // System.out.println("Hello, " + name + "!");
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
    setOutput(''); // Clear output when switching languages
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
        
        // Add compile output if available
        if (result.compile_output) {
          outputText += `Compilation Output:\n${result.compile_output}\n\n`;
        }
        
        // Add compile errors if available
        if (result.compile_error) {
          outputText += `Compilation Error:\n${result.compile_error}\n\n`;
        }
        
        // Add execution output
        if (result.output) {
          outputText += `Output:\n${result.output}`;
        }
        
        // Add execution errors if available
        if (result.error) {
          outputText += `\nError:\n${result.error}`;
        }
        
        // If no output at all
        if (!outputText.trim()) {
          outputText = 'Code executed successfully with no output.';
        }
        
        setOutput(outputText);
      } else {
        setOutput(`Error: ${result.error || 'Unknown error occurred'}`);
      }
    } catch (error) {
      setOutput(`Network Error: ${error.message}\nPlease make sure the backend server is running on http://localhost:5000`);
      setExecutionTime(null);
    } finally {
      setIsExecuting(false);
    }
  };

  // Handle dark mode toggle
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  // Apply dark mode class to document
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <div className="min-h-screen bg-cyber-dark">
      {/* Cyber Grid Background */}
      <div className="fixed inset-0 cyber-grid opacity-10 pointer-events-none"></div>
      
      {/* Matrix Rain Background */}
      <div className="fixed inset-0 matrix-rain opacity-5 pointer-events-none"></div>

      {/* Header */}
      <Header 
        darkMode={darkMode} 
        toggleDarkMode={toggleDarkMode}
        isExecuting={isExecuting}
        onRunCode={handleRunCode}
        executionTime={executionTime}
      />

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-6 py-8 space-y-8">
        {/* Language Selector */}
        <LanguageSelector 
          selectedLanguage={selectedLanguage}
          onLanguageChange={handleLanguageChange}
          darkMode={darkMode}
        />

        {/* Gaming Layout */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Left Panel - Code Editor (2/3 width) */}
          <div className="xl:col-span-2">
            <CodeEditor
              language={selectedLanguage}
              value={code}
              onChange={setCode}
              darkMode={darkMode}
              isFullscreen={false}
              onToggleFullscreen={() => {}}
            />
          </div>

          {/* Right Panel - Input and Output (1/3 width) */}
          <div className="xl:col-span-1 space-y-6">
            {/* Input Panel */}
            <InputPanel
              value={input}
              onChange={setInput}
              darkMode={darkMode}
            />

            {/* Output Panel */}
            <OutputPanel
              output={output}
              isExecuting={isExecuting}
              darkMode={darkMode}
              executionTime={executionTime}
              onClear={() => setOutput('')}
            />
          </div>
        </div>

        {/* Gaming Alert/Notification System */}
        {isExecuting && (
          <div className="fixed bottom-6 right-6 z-50">
            <div className="gaming-card p-4 bg-gradient-to-r from-cyan-900/90 to-blue-900/90 border border-cyan-400 glow-effect">
              <div className="flex items-center space-x-3">
                <div className="w-6 h-6 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin"></div>
                <div>
                  <p className="text-cyan-400 font-bold text-sm">NEURAL PROCESSING</p>
                  <p className="text-xs text-gray-300">Executing quantum algorithms...</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Success Notification */}
        {output && !isExecuting && !output.toLowerCase().includes('error') && (
          <div className="fixed bottom-6 left-6 z-50 gaming-card p-4 bg-gradient-to-r from-green-900/90 to-emerald-900/90 border border-green-400 glow-effect">
            <div className="flex items-center space-x-3">
              <div className="w-4 h-4 bg-green-400 rounded-full animate-pulse"></div>
              <div>
                <p className="text-green-400 font-bold text-sm">EXECUTION COMPLETE</p>
                <p className="text-xs text-gray-300">Neural network processed successfully</p>
              </div>
            </div>
          </div>
        )}

        {/* Error Notification */}
        {output && !isExecuting && output.toLowerCase().includes('error') && (
          <div className="fixed bottom-6 left-6 z-50 gaming-card p-4 bg-gradient-to-r from-red-900/90 to-pink-900/90 border border-red-400 glow-effect">
            <div className="flex items-center space-x-3">
              <div className="w-4 h-4 bg-red-400 rounded-full animate-pulse"></div>
              <div>
                <p className="text-red-400 font-bold text-sm">SYSTEM ERROR</p>
                <p className="text-xs text-gray-300">Neural malfunction detected</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
