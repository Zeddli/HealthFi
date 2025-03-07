// src/pages/Landing.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
      backgroundColor: '#fff'
    }}>
      <h1 style={{ fontSize: '3rem', marginBottom: '2rem' }}>DeFi Health</h1>
      <div>
        <button
          onClick={() => navigate('/login')}
          style={{
            backgroundColor: '#7DFF7D',
            border: 'none',
            borderRadius: '8px',
            padding: '1rem 2rem',
            marginRight: '1rem',
            fontSize: '1rem',
            cursor: 'pointer'
          }}
        >
          Login
        </button>
        <button
          onClick={() => navigate('/register')}
          style={{
            backgroundColor: '#ddd',
            border: 'none',
            borderRadius: '8px',
            padding: '1rem 2rem',
            fontSize: '1rem',
            cursor: 'pointer'
          }}
        >
          Register
        </button>
      </div>
    </div>
  );
};

export default Landing;
