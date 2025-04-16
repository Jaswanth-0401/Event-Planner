import React, { useState } from 'react';
import '../Styles/Login.css';
import axios from 'axios';
import { useUser } from '../Context/UserContext';
import login from '../assets/login.jpg';
import '../Styles/auth/Login.css';

const Login: React.FC = () => {
  const [role, setRole] = useState<'student' | 'organizer'>('student');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { setUser } = useUser();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await axios.post(
        'http://localhost:5000/api/auth/login',
        { email, password, role },
        { withCredentials: true }
      );

      const { token, userId, role: userRole, name } = response.data;
      localStorage.setItem('token', token);
      localStorage.setItem('userId', userId);
      localStorage.setItem('role', userRole);
      setUser({ name, email, role: userRole });

      if (userRole === 'student') {
        window.location.href = '/student/home';
      } else {
        window.location.href = '/organizer/home';
      }
    } catch (err: any) {
      console.error('Login error:', err.response?.data || err.message);
      setError(err.response?.data?.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-left">
        <img src={login} alt="Login Visual" />
      </div>

      <div className="login-right">
        <div className="login-card">
          <div className="login-header">
            <h1>Welcome Back</h1>
            <p>Please login to your account</p>
          </div>

          <div className="login-selector">
            <button
              className={role === 'student' ? 'active' : ''}
              onClick={() => setRole('student')}
            >
              Student
            </button>
            <button
              className={role === 'organizer' ? 'active' : ''}
              onClick={() => setRole('organizer')}
            >
              Organizer
            </button>
          </div>

          <form className="login-inputs" onSubmit={handleLogin}>
            {error && <p className="error-message">{error}</p>}

            <input
              type="email"
              placeholder="Email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              type="password"
              placeholder="Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <div className="login-forgot">
              <a href="#">Forgot Password?</a>
            </div>

            <button type="submit" disabled={loading}>
              {loading ? 'Logging in...' : `Login as ${role}`}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
