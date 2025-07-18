// src/main.tsx

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import App from './App';
import { AuthProvider } from './context/AuthContext';
import './index.css';

// 1. Find the single HTML element in index.html where our React app will be mounted.
const rootElement = document.getElementById('root');

// 2. A safety check to make sure that element actually exists before we proceed.
if (rootElement) {
  // 3. Create the root of our React application.
  createRoot(rootElement).render(
    // 4. StrictMode is a React tool that helps find potential problems in an app.
    <StrictMode>
      {/* 5. Our custom AuthProvider wraps everything. 
             This makes user session data available to all components. */}
      <AuthProvider>
        {/* 6. BrowserRouter from react-router-dom handles all navigation. 
             It must be inside AuthProvider so pages can access user data. */}
        <BrowserRouter>
          {/* 7. App is our main application component, rendered only once.
                 It's inside both providers, so it has access to everything it needs. */}
          <App />
        </BrowserRouter>
      </AuthProvider>
    </StrictMode>
  );
} else {
  // This message will appear in the browser's developer console if something is wrong with the setup.
  console.error(
    "Fatal Error: The root element with id 'root' was not found in the document. The React app cannot be mounted."
  );
}