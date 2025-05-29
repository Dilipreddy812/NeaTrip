import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { AuthProvider } from './context/AuthContext.tsx'; // Added this line

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider> {/* Added this wrapper */}
      <App />
    </AuthProvider> {/* Added this wrapper */}
  </StrictMode>,
)
