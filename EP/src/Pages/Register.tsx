import React, { useState } from 'react';
import axios from 'axios';
import registerImg from '../assets/register.jpg';
import '../Styles/auth/Register.css';

const Register: React.FC = () => {
  const [role, setRole] = useState<'student' | 'organizer'>('student');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [yearOfStudy, setYearOfStudy] = useState('');
  const [description, setDescription] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setMessage('');

    try {
      if (role === 'student') {
        const response = await axios.post('http://localhost:5000/api/auth/register-student', {
          name,
          email,
          password,
          phone,
          year_of_study: yearOfStudy,
        });
        setMessage('Student registered successfully!');
      } else {
        const response = await axios.post('http://localhost:5000/api/auth/register-organizer', {
          name,
          email,
          password,
          description,
          phone: phone, 
        });
        setMessage('Organizer registered successfully!');
      }

      setName('');
      setEmail('');
      setPassword('');
      setPhone('');
      setYearOfStudy('');
      setDescription('');
    } 
    catch (err) {
      setError('Registration failed. Please check your input.');
    }
  };

  return (
    <div className="register-wrapper">
      <div className="register-left">
        <img src={registerImg} alt="Register Visual" />
      </div>

      <div className="register-right">
        <div className="register-card">
          <div className="register-header">
            <h2>Register</h2>
            <p>Join us to explore exciting events!</p>
          </div>

          <div className="role-toggle">
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

          {error && <p className="error-message">{error}</p>}
          {message && <p className="success-message">{message}</p>}

          <form onSubmit={handleSubmit} className="register-form">
            <input
              type="text"
              placeholder="Name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

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

            {role === 'student' && (
              <>
                <input
                  type="tel"
                  placeholder="Phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Year of Study"
                  value={yearOfStudy}
                  onChange={(e) => setYearOfStudy(e.target.value)}
                />
              </>
            )}

            {role === 'organizer' && (
              <>
                <textarea
                  placeholder="Description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </>
            )}

            <button type="submit">Register as {role}</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;