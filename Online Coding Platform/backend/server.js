import express from 'express';
import cors from 'cors';
import axios from 'axios';

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Piston API endpoint
const PISTON_API_URL = 'https://emkc.org/api/v2/piston/execute';

// Language mapping for Piston API
const languageMap = {
  'python': 'python',
  'javascript': 'javascript',
  'cpp': 'cpp',
  'c': 'c',
  'java': 'java',
  'go': 'go',
  'rust': 'rust',
  'typescript': 'typescript'
};

// Get supported languages from Piston
app.get('/api/languages', async (req, res) => {
  try {
    const response = await axios.get('https://emkc.org/api/v2/piston/runtimes');
    const languages = response.data
      .filter(runtime => Object.values(languageMap).includes(runtime.language))
      .map(runtime => ({
        language: runtime.language,
        version: runtime.version,
        aliases: runtime.aliases || []
      }));
    
    res.json({ success: true, languages });
  } catch (error) {
    console.error('Error fetching languages:', error.message);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to fetch supported languages' 
    });
  }
});

// Execute code endpoint
app.post('/api/execute', async (req, res) => {
  try {
    const { language, code, input = '' } = req.body;

    // Validate input
    if (!language || !code) {
      return res.status(400).json({
        success: false,
        error: 'Language and code are required'
      });
    }

    // Check if language is supported
    if (!languageMap[language]) {
      return res.status(400).json({
        success: false,
        error: `Language "${language}" is not supported`
      });
    }

    // Prepare the request for Piston API
    const pistonRequest = {
      language: languageMap[language],
      version: '*',
      files: [
        {
          name: getFileName(language),
          content: code
        }
      ]
    };

    // Add stdin if provided
    if (input.trim()) {
      pistonRequest.stdin = input;
    }

    console.log('Executing code:', { language, codeLength: code.length });

    // Make request to Piston API
    const response = await axios.post(PISTON_API_URL, pistonRequest, {
      timeout: 10000 // 10 seconds timeout
    });

    const result = response.data;

    // Format the response
    const output = {
      success: true,
      output: result.run?.stdout || '',
      error: result.run?.stderr || '',
      compile_output: result.compile?.stdout || '',
      compile_error: result.compile?.stderr || ''
    };

    res.json(output);

  } catch (error) {
    console.error('Error executing code:', error.message);
    
    if (error.code === 'ECONNABORTED') {
      return res.status(408).json({
        success: false,
        error: 'Code execution timed out'
      });
    }

    res.status(500).json({
      success: false,
      error: 'Internal server error during code execution'
    });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    success: true, 
    message: 'Compiler Backend API is running',
    timestamp: new Date().toISOString()
  });
});

// Helper function to get appropriate file name based on language
function getFileName(language) {
  const extensions = {
    'python': 'main.py',
    'javascript': 'main.js',
    'cpp': 'main.cpp',
    'c': 'main.c',
    'java': 'Main.java',
    'go': 'main.go',
    'rust': 'main.rs',
    'typescript': 'main.ts'
  };
  
  return extensions[language] || 'main.txt';
}

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({
    success: false,
    error: 'Internal server error'
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`🚀 Compiler Backend API is running on port ${PORT}`);
  console.log(`📡 Health check: http://localhost:${PORT}/api/health`);
});

export default app;
