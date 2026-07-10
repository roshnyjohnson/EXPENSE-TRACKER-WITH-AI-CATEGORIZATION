import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { authAPI } from '../api/api';
import { Navigate } from 'react-router-dom';

export default function Signup() {
  const { token } = useAuth();

  // Already logged in — send to dashboard
  if (token) return <Navigate to='/dashboard' replace />;

  const [form, setForm] = useState({ name: '', email: '', password: '' });
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

    const data = await authAPI.signup(form);

    if (data.token) {
      login(data.token, data.user);
      navigate('/dashboard');
    } else {
      setError(data.message || 'Signup failed');
    }

    setLoading(false);
  }

  return (
    <div className='auth-container'>
      <div className='auth-card'>
        <h2>Create an account</h2>
        <p className='auth-subtitle'>Start tracking your expenses</p>

        {error && <p className='error-message'>{error}</p>}

        <form onSubmit={handleSubmit} className='auth-form'>
          <div className='form-group'>
            <label>Name</label>
            <input
              type='text'
              name='name'
              value={form.name}
              onChange={handleChange}
              placeholder='Your name'
              required
            />
          </div>
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
              placeholder='Choose a password'
              required
            />
          </div>
          <button type='submit' className='btn-primary' disabled={loading}>
            {loading ? 'Creating account...' : 'Sign Up'}
          </button>
        </form>

        <p className='auth-switch'>
          Already have an account? <Link to='/login'>Sign in</Link>
        </p>
      </div>
    </div>
  );
}
