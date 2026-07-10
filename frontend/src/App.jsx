import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import AddExpense from './pages/AddExpense';
import History from './pages/History';
import './App.css';
 
function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Navbar />
        <div className='main-content'>
          <Routes>
            {/* Public routes — no login required */}
            <Route path='/login' element={<Login />} />
            <Route path='/signup' element={<Signup />} />
 
            {/* Protected routes — redirect to /login if not authenticated */}
            <Route path='/dashboard' element={
              <ProtectedRoute><Dashboard /></ProtectedRoute>
            } />
            <Route path='/add' element={
              <ProtectedRoute><AddExpense /></ProtectedRoute>
            } />
            <Route path='/history' element={
              <ProtectedRoute><History /></ProtectedRoute>
            } />
 
            {/* Default: redirect root to dashboard */}
            <Route path='/' element={<Navigate to='/dashboard' replace />} />
          </Routes>
        </div>
      </AuthProvider>
    </BrowserRouter>
  );
}
 
export default App;
