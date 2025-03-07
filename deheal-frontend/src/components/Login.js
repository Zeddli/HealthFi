// src/pages/Login.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = useState({ nric: '', password: '' });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // TODO: Replace with real login logic (e.g., calling an API)
      setMessage('Login successful (dummy). Navigating...');
      // Simulate a short delay, then navigate to a main route
      setTimeout(() => {
        navigate('/submit-record');
      }, 1500);
    } catch (error) {
      setMessage(`Error: ${error.message}`);
    }
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh'
    }}>
      <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Login</h1>
      
      <form
        onSubmit={handleSubmit}
        style={{ display: 'flex', flexDirection: 'column', width: '300px' }}
      >
        <input
          style={{ marginBottom: '1rem', padding: '0.5rem' }}
          type="text"
          name="nric"
          placeholder="NRIC"
          value={formData.nric}
          onChange={handleChange}
          required
        />
        <input
          style={{ marginBottom: '1rem', padding: '0.5rem' }}
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          {/* Login Button */}
          <button type="submit" style={{ padding: '0.5rem', cursor: 'pointer' }}>
            Login
          </button>
          {/* Register Button */}
          <button
            type="button"
            onClick={() => navigate('/register')}
            style={{ padding: '0.5rem', cursor: 'pointer' }}
          >
            Register
          </button>
        </div>
      </form>

      {message && <p style={{ marginTop: '1rem' }}>{message}</p>}
    </div>
  );
};

export default Login;
