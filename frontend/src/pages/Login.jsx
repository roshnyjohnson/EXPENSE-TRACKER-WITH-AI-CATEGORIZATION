import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { authAPI } from '../api/api';
import { Navigate } from 'react-router-dom';

export default function Login() {
  const { token } = useAuth();
  // Already logged in — send to dashboard
  if (token) return <Navigate to='/dashboard' replace />;


  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError('');

    const data = await authAPI.login(form);

    if (data.token) {
      login(data.token, data.user);
      navigate('/dashboard');
    } else {
      setError(data.message || 'Login failed');
    }

    setLoading(false);
  }

  return (
    <div className='auth-container'>
      <div className='auth-card'>
        <h2>Welcome back</h2>
        <p className='auth-subtitle'>Sign in to your account</p>

        {error && <p className='error-message'>{error}</p>}

        <form onSubmit={handleSubmit} className='auth-form'>
          <div className='form-group'>
            <label>Email</label>
            <input
              type='email'
              name='email'
              value={form.email}
              onChange={handleChange}
              placeholder='you@example.com'
              required
            />
          </div>
          <div className='form-group'>
            <label>Password</label>
            <input
              type='password'
              name='password'
              value={form.password}
              onChange={handleChange}
              placeholder='Your password'
              required
            />
          </div>
          <button type='submit' className='btn-primary' disabled={loading}>
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <p className='auth-switch'>
          Don't have an account? <Link to='/signup'>Sign up</Link>
        </p>
      </div>
    </div>
  );
}
