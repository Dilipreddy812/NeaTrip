import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { AuthProvider } from './context/AuthContext';
import './index.css';

// Get the root element from the DOM
const rootElement = document.getElementById('root');

// Ensure the root element exists before trying to render
if (rootElement) {
  createRoot(rootElement).render(
    <StrictMode>
      <AuthProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </AuthProvider>
    </StrictMode>
  );
} else {
  console.error(
    "Failed to find the root element. Make sure your index.html has an element with id='root'."
  );
}