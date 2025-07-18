// src/App.tsx

import { Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import HomeFeed from './pages/HomeFeed';
import LoginPage from './pages/auth/LoginPage';
import SignupPage from './pages/auth/SignupPage';
import ProtectedRoute from './components/auth/ProtectedRoute';

function App() {
  return (
    <div>
      {/* The Navbar will appear on all pages */}
      <Navbar />
      
      {/* The Routes component will switch between pages based on the URL */}
      <Routes>
        <Route path="/" element={
          <ProtectedRoute>
            <HomeFeed />
          </ProtectedRoute>
        } />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
      </Routes>
    </div>
  );
}

export default App;