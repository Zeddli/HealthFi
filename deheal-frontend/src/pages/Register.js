// src/pages/Register.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../api/api';

const Register = () => {
  const [formData, setFormData] = useState({
    nric: '',
    fullName: '',
    phone: '',
    department: ''
  });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await registerUser(formData);
      setMessage(`Success: ${response.data.txHash}`);
      // Clear form and redirect to login
      setTimeout(() => {
        setFormData({ nric: '', fullName: '', phone: '', department: '' });
        navigate('/login');
      }, 1500);
    } catch (error) {
      setMessage(`Error: ${error.response?.data?.error || error.message}`);
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
      <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>DeFi Health</h1>
      <h2 style={{ marginBottom: '1rem' }}>User Registration</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', width: '300px' }}>
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
          type="text"
          name="fullName"
          placeholder="Full Name"
          value={formData.fullName}
          onChange={handleChange}
          required
        />
        <input
          style={{ marginBottom: '1rem', padding: '0.5rem' }}
          type="text"
          name="phone"
          placeholder="Phone number"
          value={formData.phone}
          onChange={handleChange}
          required
        />
        <input
          style={{ marginBottom: '1rem', padding: '0.5rem' }}
          type="text"
          name="department"
          placeholder="Department"
          value={formData.department}
          onChange={handleChange}
          required
        />
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            {/* Back to Login button (not a submit) */}
          <button
            type="button"
            onClick={() => navigate('/login')}
            style={{
              padding: '0.5rem 1rem',
              cursor: 'pointer'
            }}
          >
            Back to Login
          </button>
          {/* Register button (submit) */}
          <button
            type="submit"
            style={{
              padding: '0.5rem 1rem',
              cursor: 'pointer'
            }}
          >
            Register
          </button>
          
    
        </div>
      </form>
      {message && <p style={{ marginTop: '1rem' }}>{message}</p>}
    </div>
  );
};

export default Register;
