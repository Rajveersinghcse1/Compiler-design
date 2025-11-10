# Compiler Backend

This is the backend API for the web-based compiler that uses the Piston API to execute code.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Start the server:
```bash
npm start
```

Or for development with auto-reload:
```bash
npm run dev
```

The server will run on `http://localhost:5000`

## API Endpoints

### GET /api/health
Returns the health status of the API.

### GET /api/languages
Returns the list of supported programming languages.

### POST /api/execute
Executes the provided code using the Piston API.

**Request Body:**
```json
{
  "language": "python",
  "code": "print('Hello World')",
  "input": "optional stdin input"
}
```

**Response:**
```json
{
  "success": true,
  "output": "Hello World\n",
  "error": "",
  "compile_output": "",
  "compile_error": ""
}
```

## Supported Languages

- Python
- JavaScript
- C++
- C
- Java
- Go
- Rust
- TypeScript

## Technologies Used

- Node.js
- Express.js
- Axios (for Piston API calls)
- CORS (for cross-origin requests)
