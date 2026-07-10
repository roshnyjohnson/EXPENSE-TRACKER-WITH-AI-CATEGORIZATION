import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
 
export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
 
  function handleLogout() {
    logout();
    navigate('/login');
  }
 
  if (!user) return null; // Don't show navbar on login/signup pages
 
  return (
    <nav className='navbar'>
      <span className='nav-brand'>💰 SaveSmart</span>
      <div className='nav-links'>
        <Link to='/dashboard'>Dashboard</Link>
        <Link to='/add'>Add Expense</Link>
        <Link to='/history'>History</Link>
      </div>
      <div className='nav-user'>
        <span>Hi, {user.name}</span>
        <button onClick={handleLogout}>Logout</button>
      </div>
    </nav>
  );
}
