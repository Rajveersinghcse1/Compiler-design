import axios from 'axios';

// Backend API base URL
const API_BASE_URL = 'http://localhost:5000/api';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000, // 15 seconds timeout
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * Execute code using the backend API
 * @param {string} language - Programming language (python, javascript, cpp, etc.)
 * @param {string} code - Source code to execute
 * @param {string} input - Optional stdin input
 * @returns {Promise<Object>} - Execution result
 */
export const executeCode = async (language, code, input = '') => {
  try {
    const response = await api.post('/execute', {
      language,
      code,
      input
    });

    return response.data;
  } catch (error) {
    // Handle different types of errors
    if (error.response) {
      // Server responded with error status
      return {
        success: false,
        error: error.response.data?.error || 'Server error occurred',
        output: '',
        compile_output: '',
        compile_error: ''
      };
    } else if (error.request) {
      // Network error - no response received
      return {
        success: false,
        error: 'Cannot connect to the backend server. Please ensure the server is running on http://localhost:5000',
        output: '',
        compile_output: '',
        compile_error: ''
      };
    } else {
      // Other error
      return {
        success: false,
        error: error.message || 'An unexpected error occurred',
        output: '',
        compile_output: '',
        compile_error: ''
      };
    }
  }
};

/**
 * Get list of supported languages from the backend
 * @returns {Promise<Array>} - List of supported languages
 */
export const getSupportedLanguages = async () => {
  try {
    const response = await api.get('/languages');
    return response.data.languages || [];
  } catch (error) {
    console.error('Error fetching supported languages:', error);
    // Return default languages if API fails
    return [
      { language: 'python', version: '3.10.0' },
      { language: 'javascript', version: '18.15.0' },
      { language: 'cpp', version: 'g++ 9.4.0' },
      { language: 'c', version: 'gcc 9.4.0' },
      { language: 'java', version: '17.0.0' }
    ];
  }
};

/**
 * Check if the backend server is healthy
 * @returns {Promise<boolean>} - Server health status
 */
export const checkServerHealth = async () => {
  try {
    const response = await api.get('/health');
    return response.data.success === true;
  } catch (error) {
    return false;
  }
};

export default api;
