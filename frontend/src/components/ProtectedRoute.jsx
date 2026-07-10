import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
 
export default function ProtectedRoute({ children }) {
  const { token, loading } = useAuth();
 
  // While checking localStorage on app load, show nothing
  // This prevents a flash of the login page before auth state is restored
  if (loading) return null;
 
  // If no token, redirect to login
  if (!token) return <Navigate to='/login' replace />;
 
  // Token exists — render the actual page
  return children;
}