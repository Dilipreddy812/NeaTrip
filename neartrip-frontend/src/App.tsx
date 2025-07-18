import { Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import { AuthProvider } from './context/AuthContext';
import HomeFeed from './pages/HomeFeed';
import LoginPage from './pages/auth/LoginPage';
import SignupPage from './pages/auth/SignupPage';

function App() {
  return (
    <AuthProvider>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomeFeed />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;