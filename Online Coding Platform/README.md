# # Web Compiler - Online Code Editor and Executor

A modern, responsive web-based compiler and code editor that supports multiple programming languages. Built with React.js frontend and Node.js backend, powered by the free Piston API for code execution.

## 🚀 Features

- **Multi-language Support**: Python, JavaScript, C++, C, Java, and more
- **Monaco Editor**: Professional code editor with syntax highlighting, IntelliSense, and auto-completion
- **Dark/Light Mode**: Toggle between dark and light themes
- **Real-time Execution**: Run code and see output instantly
- **Input Support**: Provide stdin input for your programs
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Error Handling**: Comprehensive error reporting and handling
- **Performance Metrics**: Execution time tracking

## 🛠️ Tech Stack

### Frontend
- **React 19** - Modern React with hooks
- **Tailwind CSS** - Utility-first CSS framework
- **Monaco Editor** - VS Code's editor for the web
- **Axios** - HTTP client for API calls
- **React Icons** - Beautiful icon library
- **Vite** - Fast build tool and dev server

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **Piston API** - Free code execution service
- **CORS** - Cross-origin resource sharing
- **Axios** - HTTP client for external API calls

## 📦 Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn package manager

### Backend Setup

1. Navigate to the backend directory:
```powershell
cd backend
```

2. Install dependencies:
```powershell
npm install
```

3. Start the backend server:
```powershell
npm start
```

The backend server will run on `http://localhost:5000`

For development with auto-reload:
```powershell
npm run dev
```

### Frontend Setup

1. Open a new terminal and navigate to the project root:
```powershell
cd ..
```

2. Install frontend dependencies:
```powershell
npm install
```

3. Start the development server:
```powershell
npm run dev
```

The frontend will run on `http://localhost:5173`

## 🔧 Project Structure

```
Web-Compiler/
├── backend/                 # Backend API server
│   ├── server.js           # Express server with Piston API integration
│   ├── package.json        # Backend dependencies
│   └── README.md           # Backend documentation
├── src/                    # Frontend source code
│   ├── components/         # React components
│   │   ├── Header.jsx      # App header with controls
│   │   ├── CodeEditor.jsx  # Monaco code editor wrapper
│   │   ├── LanguageSelector.jsx  # Language selection dropdown
│   │   ├── InputPanel.jsx  # Input for stdin
│   │   └── OutputPanel.jsx # Output display panel
│   ├── services/           # API services
│   │   └── api.js          # Backend API integration
│   ├── App.jsx             # Main application component
│   ├── App.css             # Custom styles
│   ├── main.jsx            # React app entry point
│   └── index.css           # Global styles with Tailwind
├── public/                 # Static assets
├── index.html              # HTML template
├── package.json            # Frontend dependencies
├── vite.config.js          # Vite configuration
├── tailwind.config.js      # Tailwind CSS configuration
└── README.md               # This file
```

## 🎯 Usage

### Running Code

1. **Select Language**: Choose your programming language from the dropdown
2. **Write Code**: Use the Monaco editor to write your code
3. **Add Input** (Optional): Provide stdin input in the input panel
4. **Execute**: Click the "Run Code" button or use Ctrl+Enter
5. **View Output**: See results, errors, and execution time in the output panel

### Supported Languages

- **Python** - Python 3.x with standard library
- **JavaScript** - Node.js runtime
- **C++** - Modern C++ with standard library
- **C** - C99 standard
- **Java** - Java 17 with standard library

### Keyboard Shortcuts

- `Ctrl+Enter` (Cmd+Enter on Mac) - Run code
- `Ctrl+/` (Cmd+/ on Mac) - Toggle line comment
- `Ctrl+F` (Cmd+F on Mac) - Find in editor
- `Ctrl+H` (Cmd+H on Mac) - Find and replace

## 🔌 API Endpoints

### Backend API

#### GET `/api/health`
Check server health status

#### GET `/api/languages`
Get list of supported programming languages

#### POST `/api/execute`
Execute code and return results

**Request Body:**
```json
{
  "language": "python",
  "code": "print('Hello, World!')",
  "input": "optional stdin input"
}
```

**Response:**
```json
{
  "success": true,
  "output": "Hello, World!\n",
  "error": "",
  "compile_output": "",
  "compile_error": ""
}
```

## 🌟 Features in Detail

### Code Editor
- Syntax highlighting for all supported languages
- Auto-completion and IntelliSense
- Error detection and highlighting
- Code folding and minimap
- Multiple cursor support
- Find and replace functionality

### Execution Environment
- Secure code execution via Piston API
- Real-time output streaming
- Error handling and reporting
- Execution time measurement
- Support for stdin input

### User Interface
- Clean, modern design
- Responsive layout for all screen sizes
- Dark/light mode toggle
- Keyboard shortcut support
- Copy output functionality
- Real-time status indicators

## 🔒 Security

- All code execution happens in isolated containers via Piston API
- No direct server access to user code
- CORS protection for API endpoints
- Input validation and sanitization
- Rate limiting via Piston API

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-feature`
3. Commit changes: `git commit -am 'Add new feature'`
4. Push to the branch: `git push origin feature/new-feature`
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- [Piston API](https://github.com/engineer-man/piston) - Free code execution engine
- [Monaco Editor](https://microsoft.github.io/monaco-editor/) - VS Code editor for the web
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [React](https://reactjs.org/) - JavaScript library for building user interfaces

## 🐛 Known Issues

- Large output may cause performance issues (will be addressed in future updates)
- Some language-specific libraries may not be available via Piston API
- Network timeout set to 15 seconds for code execution

## 🔮 Future Enhancements

- [ ] File upload/download functionality
- [ ] Multiple file support
- [ ] Collaborative editing
- [ ] Code sharing via URLs
- [ ] More programming languages
- [ ] Custom input/output formatting
- [ ] Code templates and snippets
- [ ] User accounts and saved projects

## 📞 Support

If you encounter any issues or have questions, please:
1. Check the existing issues on GitHub
2. Create a new issue with detailed description
3. Provide steps to reproduce the problem

---

**Happy Coding! 🎉**+ Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
