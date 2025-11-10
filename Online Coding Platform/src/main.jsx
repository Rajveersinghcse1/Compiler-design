import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import UltraApp from './UltraApp.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <UltraApp />
  </StrictMode>,
)
